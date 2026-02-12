#!/bin/sh
set -e

echo "Starting MCP Server Entrypoint..."
echo "PATH: $PATH"
ls -l /usr/local/bin/apollo-mcp-server || echo "Binary not found at /usr/local/bin/apollo-mcp-server"
which apollo-mcp-server || echo "Binary not found in PATH"

# Define paths
TEMPLATE_CONFIG="/app/mcp_config.tpl.yaml"
FINAL_CONFIG="/app/mcp_config.yaml"

echo "Checking for template config at $TEMPLATE_CONFIG..."
if [ ! -f "$TEMPLATE_CONFIG" ]; then
    echo "Error: Template config not found!"
    exit 1
fi

echo "Substituting environment variables..."
# We explicitly list variables to substitute to avoid accidental replacement of other $ strings if any
# But for now, substituting all is fine as the config is simple.
envsubst < "$TEMPLATE_CONFIG" > "$FINAL_CONFIG"

echo "Verifying generated config..."
if [ ! -f "$FINAL_CONFIG" ]; then
    echo "Error: Failed to generate config file!"
    exit 1
fi

echo "Config file generated at $FINAL_CONFIG"
# Optional: print config for debugging (be careful with secrets, but for now it helps)
# cat "$FINAL_CONFIG"

echo "Starting Apollo MCP Server..."
exec apollo-mcp-server "$FINAL_CONFIG"
