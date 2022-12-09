# WebEvaluator - An Automated Website Tester

[![Slack Channel](https://img.shields.io/badge/slack-webevaluator-blue.svg?longCache=true&logo=slack)](https://join.slack.com/t/webevaluator/shared_invite/zt-1i6rwnif9-hPh9fyg4ZZSpfI79d4hfbA)
[![Docker Pulls](https://img.shields.io/docker/pulls/webevaluator/webevaluator.github.io.svg)](https://hub.docker.com/r/webevaluator/webevaluator.github.io)
[![GitHub stars](https://img.shields.io/github/stars/Aman-Codes/webevaluator?style=social)](https://github.com/Aman-Codes/webevaluator/stargazers)

## Introduction

Every year tech giants face billion dollar lawsuits against them in the United States of America and the European Union as their website is incompatible with the American with Disability Act (ADA) or the General Data Protection Regulation (GDPR), respectively. So we created a tool named WebEvaluator, ( https://webevaluator.github.io/ ) to help website developers find compliance issues and warnings in their website and it also suggests ways to fix them.
Its features are:
- A super fast crawler written in Go that could process more than 1000 requests/second/core. It looks for URLs in all the HTML, CSS, JavaScript, and sitemap.xml files.
- SSL certificate compliance agent checks for the certificate's validity and analyzes the SSL certificate for security issues.
- Cookie checker agent checks whether cookie consent is asked, deny cookie option is present and it also categorizes all the cookies stored by the website into groups like Advertisement, Analytics, Necessary, Functional, and Others.
- ADA compliance agent looks for various issues on the website, which could make it difficult for people with special needs to access it. It also suggests ways to fix those errors.
- Security headers agent verifies that all the required security headers are present.
- Report generation agent creates a detailed downloadable report in pdf/csv format with a score for each category of analysis.

## Deployed Link
https://webevaluator.github.io/

## Implementation Details

#### Crawler

A super-fast crawler is created in Golang using the [colly framework](https://github.com/gocolly/colly) (Apache-2.0 License). The crawler is configured with all the advanced features like:
* Superfast (more than 1000 requests/second on a single core)
* Request delays and maximum concurrency per domain to prevent reaching rate limit of domain
* Async or Parallel scraping support

The complete unique list of URLs found from the above process are subdivided based on :
* Active URLs
* Inactive/Broken URLs
* Domain wise classification of URLs
* HTTP and HTTPS URLs

The above-classified list of URLs have been passed to other agents for further processing. 
The URLs found are saved in a file on disk storage for a temporary basis and its content would be passed to other agents.

#### SSL certificate compliance

For collecting the SSL/TLS information from the host we build an API to get the information about the host and returns the information in JSON format. Some of the features are:
* Checks for the validity and issuer of the certificate
* Analyzes the SSL certificate for security issues

Other than this we are also checking that all the HTTP links are automatically redirected to HTTPS using crawler.

#### Cookie checker

According to the General Data Protection Regulation cookies compliance are:

* Receive users’ consent before you use any cookies except strictly necessary cookies
* Provide accurate and specific information about the data each cookie tracks and its purpose in plain language before consent is received
* Document and store consent received from users
* Allow users to access your service even if they refuse to allow the use of certain cookies
* Make it as easy for users to withdraw their consent as it was for them to give their consent in the first place

We implemented the cookie checker agent in the following manner:
* Firstly, a list of every cookie along with all its details like domain, expiry date, secure or insure etc. would be created.
* The above-found cookies would be classified into various different types based on their categories like:
    * Advertisement
    * Analytics
    * Necessary
    * Functional
    * Others
* The cookies consent verification link can be checked manually by clearing all the cookies programmatically and then reloading the page and it should only store the cookies for that session only when we accept the cookies agreement. 
* For all the URLs found we would search if the website contains any cookie disclaimer or privacy notice regarding the same.

##### Assumptions for cookie agents:


* For cookie classification, we are using a collection of some open-source datasets.
* Any cookie whose information is not available in the above dataset would be classified into the Others category.
* To check if user consent for cookies is asked and followed we would be relying on certain keywords present on the button text such as 
    * Accept List: ["Accept",  "Accept All", "Allow"]
    * Deny List: ["Reject", "Deny", "Refuse"]

#### ADA compliance

ADA compliance stands for the Americans with Disabilities Act Standards for Accessible Design. Means all electronic information and technology (website) must be accessible to those with disabilities.
The ADA compliance majorly includes the following points:

| <!-- -->    | <!-- -->    |
| --- | --- |
| **Alternatives** | **a**. Alt text for all images and non-text content</br > **b**. Captions for all audio or video content |
| **Presentation** | **a**. Proper HTML structure and meaningful order (Eg: consecutive heading levels)</br > **b**. Audio control: Any audio must be able to pause, stopped or muted</br > **c**. Color contrast ratio \&gt;= 4.5:1 b/w regular text &amp; background and \&gt;= 3:1 for large text</br > **d**. Text resize: Text must be resizable up to 200% without affecting readability |
| **User Control** | **a**. Keyboard only accessible</br > **b**. Skip navigation link |
| **Understandable** | **a**. Link anchor text</br > **b**. Website language |
| **Predictability** | **a**. Consistent navigation</br > **b**. Form labels and instructions</br > **c**. Name, role, value for all UI components |

A microservice would be created in node.js which would receive the list of URLs from the main golang backend and would run ADA compliance scans. The ADA compliance agent would fetch the webpage from the provided URL.

##### HTML Errors

Firstly, it would analyze the HTML code by checking its structural and logical integrity. [tota11y](https://github.com/Khan/tota11y) would look for any possible syntax error or security concerns in the provided markup code. All the HTML markup related errors or warnings would be reported in this stage. Errors like 
* Empty or missing alt text of images
* Missing form label
* Non-consecutive heading tags

##### CSS Errors

Then in the next stage all the CSS and style related errors using [checka11y](https://checka11y.jackdomleo.dev) would be reported like:
* Improper contrast ratio
* Low font size

##### JavaScript Errors

Lastly, all the JavaScript related errors are been reported like:
* Errors/warnings on the console
* Syntactically invalid code
* Runtime time and logical errors


## Tools and Technology

The project is using a microstructure architecture where we have the main server in golang which is communicating with all other services/agents/scripts such as Python, Node.js etc.

| **Agent name/ Feature** | **Tech Stack** | **Description** |
| --- | --- | --- |
| Crawler | Golang colly framework | Using colly framework of Golang as it is one of the fastest available crawler |
| SSL certificate compliance | Golang | Golang script that searches for the SSL information |
| Cookie checker | Node.js and JavaScript | Using Puppeteer for automated cookie consent verification |
| ADA compliance | Node.js and JavaScript | Using a variety of node libraries for getting complete ADA compliance information |
| Security Headers | Python | Built a Flask API that checks for the headers in the HTTP request |

The front end is created in React.js and Material UI. All the reports are displayed to users in a visually appealing manner which can be exported in formats such as PDF. We created a very flexible and versatile foundation for our codebase, so that in future its functionality could be easily extended and new agents could be easily added into it. 


|<!-- -->    | Page-specific | All URLs |
| --- | --- | --- |
| SSL Agent | ✅ | ❌ |
| Cookies checker | ✅ | ❌ |
| ADA compliance | ✅ | ✅ |
| Security Headers | ✅ | ❌ |

## Usage or Working Demo

![image](https://raw.githubusercontent.com/Aman-Codes/webevaluator/master/1.png)

![image](https://raw.githubusercontent.com/Aman-Codes/webevaluator/master/2.jpeg)

![image](https://raw.githubusercontent.com/Aman-Codes/webevaluator/master/3.jpeg)

![image](https://raw.githubusercontent.com/Aman-Codes/webevaluator/master/4.jpeg)

## Contributing Guidelines

1. This repository consists of 2 directory `frontend`,`backend`.
2. The `frontend` directory the frontent code written in React.
3. The `backend` contains `db`, `go`,`node` and `python` directory which have databases, crawler, webpages backend and SSL checker code respectively.
4. So, commit code to the corresponding services.

### Setting up the repository locally

1. Fork the repo to your account.

2. Clone your forked repo to your local machine:
```
git clone https://github.com/Aman-Codes/webevaluator.git (https)
```
or
```
git clone git@github.com:Aman-Codes/webevaluator.git (ssh)
```
This will make a copy of the code to your local machine.

3. Change directory to `webevaluator`.
```
cd webevaluator
```

4. Check the remote of your local repo by:
```
git remote -v
```
It should output the following:
```
origin	https://github.com/<username>/webevaluator.git (fetch)
origin	https://github.com/<username>/webevaluator.git (push)
```
or
```
origin	git@github.com:<username>/webevaluator.git (fetch)
origin	git@github.com:<username>/webevaluator.git (push)
```
Add upstream to remote:
```
git remote add upstream https://github.com/Aman-Codes/webevaluator.git (https)
```
or
```
git remote add upstream git@github.com:Aman-Codes/webevaluator.git (ssh)
```
Running `git remote -v` should then print the following:
```
origin	https://github.com/<username>/webevaluator.git (fetch)
origin	https://github.com/<username>/webevaluator.git (push)
upstream	https://github.com/Aman-Codes/webevaluator.git (fetch)
upstream	https://github.com/Aman-Codes/webevaluator.git (push)
```
or
```
origin	git@github.com:<username>/webevaluator.git (fetch)
origin	git@github.com:<username>/webevaluator.git (push)
upstream	git@github.com:Aman-Codes/webevaluator.git (fetch)
upstream	git@github.com:Aman-Codes/webevaluator.git (push)
```
## Installation or Dev Setup

### Method 1 (recommended): Using Docker

#### Pre-requisites

1. Install `Docker` by looking up the [docs](https://docs.docker.com/get-docker/)
2. Install `Docker Compose` by looking up the [docs](https://docs.docker.com/compose/install/)

#### Steps

1. Make sure you are inside the root of the project (i.e., `./webevaluator/` folder).
2. Setup environment variables in `.env` files of all folders according to `.env.sample` files.
3. Run `docker-compose up` to spin up the containers.
4. The website would then be available locally at `http://localhost:3000/`.
5. The above command could be run in detached mode with `-d` flag as `docker-compose up -d`.
6. For help, run the command `docker-compose -h`.

### Method 2 (not recommended): Setup services independently

For Linux based systems refer to [LinuxInstallation.md](https://github.com/Aman-Codes/webevaluator/blob/master/LinuxInstallation.md) and for Windows refer to [WindowsInstallation.md](https://github.com/Aman-Codes/webevaluator/blob/master/WindowsInstallation.md)

### Sample Report

See the [sample report](https://github.com/Aman-Codes/webevaluator/blob/master/sampleReport.pdf) generated from the tool.

### References

* https://github.com/gocolly/colly
* https://gdpr.eu/cookies
* https://github.com/jkwakman/Open-Cookie-Database
* https://cookiedatabase.org
* https://www.cookieserve.com
* https://checka11y.jackdomleo.dev
* https://github.com/Khan/tota11y
* https://csp.withgoogle.com/docs/index.html
* https://github.com/oazevedo/GDPR-is-my-Website-Insecure/blob/master/GDPR%20-%20Is%20My%20Website%20inSecure-v1.4.pdf
* https://github.com/sethblack/python-seo-analyzer
* https://github.com/eliasdabbas/advertools
* https://github.com/santoru/shcheck
