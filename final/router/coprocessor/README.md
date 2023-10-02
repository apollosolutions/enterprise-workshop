# Apollo Router Co-processor Example

This example demonstrates how to write a simple co-processor that implements a data 
governance rule.  In this case we are scanning response data for credit card numbers
and redacting them.

## Build Binary

`go build`

## Build Container

`make container`

## Push to Google Registry

First `cp dot_env .env` and edit `.env` with your GCP project ID.

Next, `make push`.

## Deploy to Google Cloud Run

First `make push` then `make deploy`.