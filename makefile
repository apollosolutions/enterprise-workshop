include .env

deploy-router:
	gcloud secrets create $(ALIAS) 
	gcloud secrets versions add --data-file=./router/router.yaml $(ALIAS)
	gcloud run deploy $(ALIAS)-router --image gcr.io/summit-enterprise-workshop/router-v2_0-preview:latest \
        --command=/dist/router \
        --set-secrets=/dist/config/router.yaml=$(ALIAS):latest \
        --set-env-vars "APOLLO_ROUTER_HOT_RELOAD=true,APOLLO_KEY=$(APOLLO_KEY),APOLLO_GRAPH_REF=$(APOLLO_GRAPH_REF)" --platform managed --region us-central1 \
        --allow-unauthenticated

update-router:
	gcloud secrets versions add --data-file=./router/router.yaml $(ALIAS)


configure-studio:
	gcloud run services describe $(ALIAS)-router --region us-central1 --format 'value(status.url)' > url.json
	curl --request POST \
    --header 'content-type: application/json' \
    --header 'X-API-Key: $(APOLLO_USER_KEY)' \
    --url 'https://graphql.api.apollographql.com/api/graphql' \
    --data '{"query":"mutation UpdateURL($$name: String!, $$graphId: ID!, $$url: String) {\n  graph(id: $$graphId) {\n    variant(name: $$name) {\n      updateURL(url: $$url) {\n        createdAt\n      }\n    }\n  }\n}","variables":{"name":"current","graphId":"$(APOLLO_GRAPH_ID)","url":"$(shell cat url.json)"}}'
	curl --request POST \
		--header 'content-type: application/json' \
        --header 'X-API-Key: $(APOLLO_USER_KEY)' \
        --url 'https://graphql.api.apollographql.com/api/graphql' \
        --data '{"query":"mutation Mutation($$graphId: ID!, $$name: String!, $$subscriptionUrl: String) {\n  graph(id: $$graphId) {\n    variant(name: $$name) {\n      updateSubscriptionURL(subscriptionUrl: $$subscriptionUrl) {\n        createdAt\n      }\n    }\n  }\n}","variables":{"graphId":"$(APOLLO_GRAPH_ID)","name":"current","subscriptionUrl":"$(shell cat url.json)"}}'
	curl --request POST \
		--header 'content-type: application/json' \
        --header 'X-API-Key: $(APOLLO_USER_KEY)' \
        --url 'https://graphql.api.apollographql.com/api/graphql' \
        --data '{"query":"mutation Mutation($$graphId: ID!, $$name: String!, $$preflightScript: String) {\n  graph(id: $$graphId) {\n    variant(name: $$name) {\n      updatePreflightScript(preflightScript: $$preflightScript) {\n        createdAt\n      }\n    }\n  }\n}","variables":{"graphId":"$(APOLLO_GRAPH_ID)","name":"current","preflightScript":"console.log(\"fetching new token.....\");const getToken=async e=>{let o=await explorer.fetch(\"https:\/\/proxy-j3nprurqka-uc.a.run.app/authn\",{method:\"POST\",header:{\"Content-Type\":\"application\/json\"},body:JSON.stringify({email:e,password:\"apolloworkshop\",returnSecureToken:!0})});return o.json()},authorizedCredentials=await getToken(\"yes@apolloworkshop.com\"),{idToken:authorizedToken}=authorizedCredentials;explorer.environment.set(\"authorizedToken\",authorizedToken),console.log(\"successfully set authorized token\");const unauthorizedCredentials=await getToken(\"no@apolloworkshop.com\"),{idToken:unauthorizedToken}=unauthorizedCredentials;explorer.environment.set(\"unauthorizedToken\",unauthorizedToken),console.log(\"successfully set token unauthorized token\");"}}'
	curl --request POST \
		--header 'content-type: application/json' \
        --header 'X-API-Key: $(APOLLO_USER_KEY)' \
		--url 'https://graphql.api.apollographql.com/api/graphql' \
        --data '{"query":"mutation Mutation($$graphId: ID!, $$name: String!, $$description: String) {\n  graph(id: $$graphId) {\n    createPersistedQueryList(name: $$name, description: $$description) {\n      ... on CreatePersistedQueryListResult {\n        persistedQueryList {\n          createdAt\n        id\n  }\n      }\n    }\n  }\n}","variables":{"graphId":"$(APOLLO_GRAPH_ID)","name":"pq_list","description":"Our PQ List"}}' -o pq.json

publish-pq-list:
	rover persisted-queries publish --graph-id $(APOLLO_GRAPH_ID) --list-id $(shell (cat pq.json | jq .data.graph.createPersistedQueryList.persistedQueryList.id)) \
    	--manifest ./final/workshop-pq-manifest.json

check-customers:
	rover subgraph check $(APOLLO_GRAPH_REF) \
        --name customers \
        --schema ./customers-schema.graphql

check-orders:
	rover subgraph check $(APOLLO_GRAPH_REF) \
		--name orders \
		--schema ./orders-schema.graphql

check-products:
	APOLLO_KEY=$(APOLLO_KEY) \
	rover subgraph check $(APOLLO_GRAPH_REF) \
        --name products \
        --schema ./products-schema.graphql

publish-customers:
	rover subgraph publish $(APOLLO_GRAPH_REF) \
        --name customers \
		--routing-url https://subgraph-customers-j3nprurqka-ue.a.run.app \
        --schema ./customers-schema.graphql

publish-orders:
	rover subgraph publish $(APOLLO_GRAPH_REF) \
        --name orders \
		--routing-url https://subgraph-orders-j3nprurqka-ue.a.run.app \
        --schema ./orders-schema.graphql

publish-products:
	rover subgraph publish $(APOLLO_GRAPH_REF) \
        --name products \
        --convert \
		--routing-url https://subgraph-products-j3nprurqka-ue.a.run.app \
        --schema ./products-schema.graphql