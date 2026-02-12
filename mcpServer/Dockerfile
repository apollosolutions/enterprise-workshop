# Use Debian as base image to have shell and utilities
FROM debian:bookworm-slim

WORKDIR /app

# Install dependencies: curl for downloading binary, gettext-base for envsubst, ca-certificates for HTTPS
RUN apt-get update && apt-get install -y \
    curl \
    gettext-base \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install Apollo MCP Server and move to /usr/local/bin
# The install script downloads to the current directory when run this way or we need to check where it puts it.
# The logs said "You can now run... using ./apollo-mcp-server" which implies it's in CWD (/app).
RUN curl -sSL https://mcp.apollo.dev/download/nix/latest | sh \
    && mv ./apollo-mcp-server /usr/local/bin/apollo-mcp-server \
    && chmod +x /usr/local/bin/apollo-mcp-server

# Copy the MCP configuration file as a template
COPY mcp_config.yaml /app/mcp_config.tpl.yaml

# Copy entrypoint script
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Set environment variables
ENV APOLLO_GRAPH_REF=${APOLLO_GRAPH_REF}
ENV APOLLO_KEY=${APOLLO_KEY}
ENV ENDPOINT=${ENDPOINT}

# Expose port 8000
EXPOSE 8000

# Use entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]
