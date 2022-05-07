#!/usr/bin/env python3

import urllib.request
import urllib.error
import urllib.parse
import http.client
import socket
import sys
import os


client_headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:53.0)\
 Gecko/20100101 Firefox/53.0',
    'Accept': 'text/html,application/xhtml+xml,\
 application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US;q=0.8,en;q=0.3',
    'Upgrade-Insecure-Requests': 1
 }


sec_headers = {
    'X-XSS-Protection': 'deprecated',
    'X-Frame-Options': 'warning',
    'X-Content-Type-Options': 'warning',
    'Strict-Transport-Security': 'error',
    'Content-Security-Policy': 'warning',
    'X-Permitted-Cross-Domain-Policies': 'deprecated',
    'Referrer-Policy': 'warning',
    'Expect-CT': 'warning',
    'Permissions-Policy': 'warning',
    'Cross-Origin-Embedder-Policy': 'warning',
    'Cross-Origin-Resource-Policy': 'warning',
    'Cross-Origin-Opener-Policy': 'warning'
}

information_headers = {
    'X-Powered-By',
    'Server'
}

cache_headers = {
    'Cache-Control',
    'Pragma',
    'Last-Modified'
    'Expires',
    'ETag'
}

headers = {}


def parse_headers(hdrs):
    global headers
    headers = dict((x.lower(), y) for x, y in hdrs)


def normalize(target):
    try:
        if (socket.inet_aton(target)):
            target = 'http://' + target
    except (ValueError, socket.error):
        pass
    finally:
        return target


def print_error(e):
    sys.stdout = sys.__stdout__
    if isinstance(e, ValueError):
        return("Unknown url type")

    if isinstance(e, urllib.error.HTTPError):
        return("[!] URL Returned an HTTP error")

    if isinstance(e, urllib.error.URLError):
        if "CERTIFICATE_VERIFY_FAILED" in str(e.reason):
            return("SSL: Certificate validation error.\nIf you want to \
    ignore it run the program with the \"-d\" option.")
        else:
            return("Target host seems to be unreachable ({})".format(e.reason))


def check_target(target):
    
    ssldisabled = False
    useget = False
    proxy = False
    response = None

    target = normalize(target)

    request = urllib.request.Request(target, headers=client_headers)
    
    method = 'GET' if useget else 'HEAD'
    request.get_method = lambda: method

    try:
        response = urllib.request.urlopen(request, timeout=10)

    except Exception as e:
        print_error(e)
        sys.exit(1)

    if response is not None:
        return response
    sys.exit(3)


def is_https(target):
    
    return target.startswith('https://')
                     


def main(targets):

    information = True
    json_output = True
    
    if json_output:
        global json_headers
        sys.stdout = open(os.devnull, 'w')

    json_out = {}
    for target in targets:
        json_headers = {}

        safe = 0
        unsafe = 0

        response = check_target(target)
        rUrl = response.geturl()
        json_results = {}


        parse_headers(response.getheaders())
        json_headers[f"{rUrl}"] = json_results
        json_results["present"] = {}
        json_results["missing"] = []

        for safeh in sec_headers:
            lsafeh = safeh.lower()
            if lsafeh in headers:
                safe += 1
                json_results["present"][safeh] = headers.get(lsafeh)


            else:
                unsafe += 1
                json_results["missing"].append(safeh)
                if safeh == 'Strict-Transport-Security' and not is_https(rUrl):
                    unsafe -= 1
                    json_results["missing"].remove(safeh)
                    continue
                if sec_headers.get(safeh) == "deprecated":
                    unsafe -= 1
                    json_results["missing"].remove(safeh)            
                    continue
                

        if information:
            json_headers["information_disclosure"] = {}
            i_chk = False
            for infoh in information_headers:
                linfoh = infoh.lower()
                if linfoh in headers:
                    json_headers["information_disclosure"][infoh] = headers.get(linfoh)
                    i_chk = True

        json_out.update(json_headers)

    if json_output:
        sys.stdout = sys.__stdout__
        return(json_out)