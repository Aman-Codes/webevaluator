# Golang Backend

This repo contains the Go backend server code which by default runs locally on the port 8080.

## Deployed Link

https://gowebevaluator.onrender.com/status

## Pre-requisites

Your machine should have golang version 1.17 or above, Npm(or Yarn) and Node.js installed to use it locally.

## Installation 

- Run the below commands

```sh
go install
npm install -g nodemon 
```
## Run

- Run the below command command

```sh
nodemon --exec go run main.go --signal SIGTERM
```
It will start the server at `localhost:8080`


