# Security Header Check

Run app.py as flask app

Send URL as POST data on `http://localhost:8000/securityheader` just as below:

```
{"URL":"https://www.marsh.com/uk/home.html"}
```

will give results as follows:

```
{
    "https://www.marsh.com/uk/home.html": {
        "missing": [
            "Content-Security-Policy",
            "Referrer-Policy",
            "Expect-CT",
            "Permissions-Policy",
            "Cross-Origin-Embedder-Policy",
            "Cross-Origin-Resource-Policy",
            "Cross-Origin-Opener-Policy"
        ],
        "present": {
            "Strict-Transport-Security": "max-age=63072000; includeSubdomains; preload",
            "X-Content-Type-Options": "nosniff",
            "X-Frame-Options": "allow-from *.force.com",
            "X-XSS-Protection": "1; mode=block"
        }
    },
    "information_disclosure": {
        "Server": "Apache"
    }
}
```


# SSL Checker API

Run app.py as flask app

Send URL as POST data on `http://localhost:8000/ssl` just as below:

```
{
    "URL":"https://www.marsh.com/uk/home.html"
}
```

will give results as follows:

```
{
    "www.marsh.com": {
        "host": "www.marsh.com",
        "issued_to": "author.www.marshinc.net",
        "issued_o": "Marsh & McLennan Companies, Inc.",
        "issuer_c": "GB",
        "issuer_o": "COMODO CA Limited",
        "issuer_ou": null,
        "issuer_cn": "COMODO RSA Organization Validation Secure Server CA",
        "cert_sn": "61095241467533998605412844127995333741",
        "cert_sha1": "93:B2:55:FD:7B:D3:68:7D:3B:50:B6:E6:CB:5E:CB:64:AF:75:D0:36",
        "cert_alg": "sha256WithRSAEncryption",
        "cert_ver": 2,
        "cert_sans": "DNS:author.www.marshinc.net; DNS:affinity.marsh.com; DNS:amrae.marsh.com; DNS:author-dev.www.marshinc.net; DNS:author-dev2.www.marshinc.net; DNS:author-prod2.www.marshinc.net; DNS:author-qa.www.marshinc.net; DNS:author-qa2.www.marshinc.net; DNS:author-stage.www.marshinc.net; DNS:author-stage2.www.marshinc.net; DNS:content.linqbymarsh.com; DNS:dev-refresh.www.marsh.com; DNS:dev.content.linqbymarsh.com; DNS:dev.trustedpals.com; DNS:dev.upgrade.www.marsh.com; DNS:dev.www.marsh.com; DNS:dev.www.trustedpals.com; DNS:ferma.marsh.com; DNS:graduate.marsh.com; DNS:intranet.marsh.com; DNS:jlt.marsh.com; DNS:lorant.marsh.com; DNS:marsh.com; DNS:marshspecialty.marsh.com; DNS:mercerprod.www.marshinc.net; DNS:nz.mercermarshbenefits.com; DNS:pcs.marsh.com; DNS:preview.www.marsh.com; DNS:proliability.com; DNS:qa-refresh.www.marsh.com; DNS:qa.content.linqbymarsh.com; DNS:qa.trustedpals.com; DNS:qa.upgrade.www.marsh.com; DNS:qa.www.marsh.com; DNS:qa.www.trustedpals.com; DNS:qa.youraccountonline.www.marshinc.net; DNS:refresh.www.marsh.com; DNS:stage-refresh.www.marsh.com; DNS:stage.affinity.marsh.com; DNS:stage.amrae.marsh.com; DNS:stage.ferma.marsh.com; DNS:stage.insolutionsworld.marsh.com; DNS:stage.micro.www.marsh.com; DNS:stage.pcs.marsh.com; DNS:stage.upgrade.www.marsh.com; DNS:stage.www.marsh.com; DNS:staging.content.linqbymarsh.com; DNS:staging.upgrade.content.linqbymarsh.com; DNS:staging.www.trustedpals.com; DNS:uprr.marsh.com; DNS:wortham.marsh.com; DNS:www.marsh-mbj.com; DNS:www.marsh.com; DNS:www.marshadvantage.com.au; DNS:www.mercermarshbenefits.com",
        "cert_exp": false,
        "cert_valid": true,
        "valid_from": "2021-11-30",
        "valid_till": "2022-03-09",
        "validity_days": 99,
        "days_left": 71,
        "valid_days_to_expire": 70,
        "tcp_port": 443,
        "grade": "A+",
        "poodle_vuln": false,
        "heartbleed_vuln": false,
        "heartbeat_vuln": false,
        "freak_vuln": false,
        "logjam_vuln": false,
        "drownVulnerable": false
    }
}
```
