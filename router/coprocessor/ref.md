
## RouterRequest
```
{
  // Control properties
  "version": 1,
  "stage": "RouterRequest",
  "control": "continue",
  "id": "1b19c05fdafc521016df33148ad63c1b",

  // Data properties
  "headers": {
    "cookie": [
      "tasty_cookie=strawberry"
    ],
    "content-type": [
      "application/json"
    ],
    "host": [
      "127.0.0.1:4000"
    ],
    "apollo-federation-include-trace": [
      "ftv1"
    ],
    "apollographql-client-name": [
      "manual"
    ],
    "accept": [
      "*/*"
    ],
    "user-agent": [
      "curl/7.79.1"
    ],
    "content-length": [
      "46"
    ]
  },
  "body": "{
    \"query\": \"query GetActiveUser {\n  me {\n  name\n}\n}\"
  }",
  "context": {
    "entries": {
      "accepts-json": false,
      "accepts-wildcard": true,
      "accepts-multipart": false
    }
  },
  "sdl": "..." // String omitted due to length
  "path": "/",
  "method": "POST"
}
```

## RouterResponse
```
{
  // Control properties
  "version": 1,
  "stage": "RouterResponse",
  "control": "continue",
  "id": "1b19c05fdafc521016df33148ad63c1b",

  // Data properties
  "headers": {
    "vary": [
      "origin"
    ],
    "content-type": [
      "application/json"
    ]
  },
  "body": "{
    \"data\": {
      \"me\": {
        \"name\": \"Ada Lovelace\"
      }
    }
  }",
  "context": {
    "entries": {
      "apollo_telemetry::subgraph_metrics_attributes": {},
      "accepts-json": false,
      "accepts-multipart": false,
      "apollo_telemetry::client_name": "manual",
      "apollo_telemetry::usage_reporting": {
        "statsReportKey": "# Long\nquery Long{me{name}}",
        "referencedFieldsByType": {
          "User": {
            "fieldNames": [
              "name"
            ],
            "isInterface": false
          },
          "Query": {
            "fieldNames": [
              "me"
            ],
            "isInterface": false
          }
        }
      },
      "apollo_telemetry::client_version": "",
      "accepts-wildcard": true
    }
  },
  "statusCode": 200,
  "sdl": "..." // Omitted due to length
}
```


## SubgraphRequest
```
{
  // Control properties
  "version": 1,
  "stage": "SubgraphRequest",
  "control": "continue",
  "id": "666d677225c1bc6d7c54a52b409dbd4e",

  // Data properties
  "headers": {},
  "body": {
    "query": "query TopProducts__reviews__1($representations:[_Any!]!){_entities(representations:$representations){...on Product{reviews{body id}}}}",
    "operationName": "TopProducts__reviews__1",
    "variables": {
      "representations": [
        {
          "__typename": "Product",
          "upc": "1"
        },
        {
          "__typename": "Product",
          "upc": "2"
        },
        {
          "__typename": "Product",
          "upc": "3"
        }
      ]
    }
  },
  "context": {
    "entries": {
      "apollo_telemetry::usage_reporting": {
        "statsReportKey": "# TopProducts\nquery TopProducts{topProducts{name price reviews{body id}}}",
        "referencedFieldsByType": {
          "Query": {
            "fieldNames": [
              "topProducts"
            ],
            "isInterface": false
          },
          "Review": {
            "fieldNames": [
              "body",
              "id"
            ],
            "isInterface": false
          },
          "Product": {
            "fieldNames": [
              "price",
              "name",
              "reviews"
            ],
            "isInterface": false
          }
        }
      },
      "apollo_telemetry::client_version": "",
      "apollo_telemetry::subgraph_metrics_attributes": {},
      "apollo_telemetry::client_name": "",
    }
  },
  "uri": "https://reviews.demo.starstuff.dev/",
  "method": "POST",
  "serviceName": "reviews"
}
```

## SubgraphResponse
```
{
  // Control properties
  "version": 1,
  "stage": "SubgraphResponse",
  "id": "b7810c6f7f95640fd6c6c8781e3953c0",
  "control": "continue",

  // Data properties
  "headers": {
    "etag": [
      "W/\"d3-7aayASjs0+e2c/TpiAYgEu/yyo0\""
    ],
    "via": [
      "2 fly.io"
    ],
    "server": [
      "Fly/90d459b3 (2023-03-07)"
    ],
    "date": [
      "Thu, 09 Mar 2023 14:28:46 GMT"
    ],
    "x-powered-by": [
      "Express"
    ],
    "x-ratelimit-limit": [
      "10000000"
    ],
    "access-control-allow-origin": [
      "*"
    ],
    "x-ratelimit-remaining": [
      "9999478"
    ],
    "content-type": [
      "application/json; charset=utf-8"
    ],
    "fly-request-id": [
      "01GV3CCG5EM3ZNVZD2GH0B00E2-lhr"
    ],
    "x-ratelimit-reset": [
      "1678374007"
    ]
  },
  "body": {
    "data": {
      "_entities": [
        {
          "reviews": [
            {
              "body": "Love it!",
              "id": "1"
            },
            {
              "body": "Prefer something else.",
              "id": "4"
            }
          ]
        },
        {
          "reviews": [
            {
              "body": "Too expensive.",
              "id": "2"
            }
          ]
        },
        {
          "reviews": [
            {
              "body": "Could be better.",
              "id": "3"
            }
          ]
        }
      ]
    }
  },
  "context": {
    "entries": {
      "apollo_telemetry::usage_reporting": {
        "statsReportKey": "# TopProducts\nquery TopProducts{topProducts{name price reviews{body id}}}",
        "referencedFieldsByType": {
          "Product": {
            "fieldNames": [
              "price",
              "name",
              "reviews"
            ],
            "isInterface": false
          },
          "Query": {
            "fieldNames": [
              "topProducts"
            ],
            "isInterface": false
          },
          "Review": {
            "fieldNames": [
              "body",
              "id"
            ],
            "isInterface": false
          }
        }
      },
      "apollo_telemetry::client_version": "",
      "apollo_telemetry::subgraph_metrics_attributes": {},
      "apollo_telemetry::client_name": ""
    }
  },
  "serviceName": "reviews",
  "statusCode": 200
}
```