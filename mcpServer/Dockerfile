# Use the official Apollo MCP Server container image
FROM --platform=linux/amd64 ghcr.io/apollographql/apollo-mcp-server:latest

# Expose port 8000 for http transport (updated default port in v1.1.0+)
EXPOSE 8000

# Copy the MCP configuration file
COPY mcp_config.yaml /config.yaml

# Set environment variables
ENV APOLLO_GRAPH_REF=${APOLLO_GRAPH_REF}
ENV APOLLO_KEY=${APOLLO_KEY}

