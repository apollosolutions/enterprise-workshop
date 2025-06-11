# Use the official Apollo MCP Server container image
FROM --platform=linux/amd64 ghcr.io/apollographql/apollo-mcp-server:latest

# Expose port 5000 for http transport
EXPOSE 5000

# Set environment variables
ENV APOLLO_GRAPH_REF=${APOLLO_GRAPH_REF}
ENV APOLLO_KEY=${APOLLO_KEY}

