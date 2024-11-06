FROM --platform=linux/amd64 ghcr.io/apollographql/router:v2.0.0-preview.0

WORKDIR /dist
COPY router.yaml router.yaml

ENV PORT 8080 ${PORT}
ENV APOLLO_GRAPH_REF ${APOLLO_GRAPH_REF}
ENV APOLLO_KEY ${APOLLO_KEY}

ENTRYPOINT ["/dist/router", "--config", "/dist/router.yaml"]

