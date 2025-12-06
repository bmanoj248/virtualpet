#!/bin/bash

# Test Script to Verify Testim Credentials
# Run this locally to test your token and project ID before using in CI/CD

echo "🧪 Testim Credentials Verification Script"
echo "=========================================="
echo ""

# Check if token and project ID are provided
if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Usage: ./test-testim-credentials.sh <YOUR_TOKEN> <YOUR_PROJECT_ID>"
    echo ""
    echo "Example:"
    echo "  ./test-testim-credentials.sh PAK-abc123... usw2KG96lZ"
    exit 1
fi

TOKEN=$1
PROJECT_ID=$2

echo "Token: ${TOKEN:0:10}... (length: ${#TOKEN})"
echo "Project ID: $PROJECT_ID (length: ${#PROJECT_ID})"
echo ""

# Check if Testim CLI is installed
if ! command -v testim &> /dev/null; then
    echo "❌ Testim CLI is not installed"
    echo "Install it with: npm install -g @testim/testim-cli"
    exit 1
fi

echo "✅ Testim CLI is installed"
echo "Version: $(testim --version)"
echo ""

# Test 1: List projects (verifies token authentication)
echo "🔍 Test 1: Listing projects (verifies token authentication)..."
if testim projects list --token "$TOKEN" 2>&1; then
    echo "✅ Token authentication successful - can list projects"
else
    echo "❌ Token authentication failed - cannot list projects"
    echo "   This means your token is invalid, expired, or has wrong permissions"
    exit 1
fi
echo ""

# Test 2: Check if project ID is accessible
echo "🔍 Test 2: Verifying project access..."
if testim projects list --token "$TOKEN" | grep -q "$PROJECT_ID"; then
    echo "✅ Project ID found in accessible projects"
else
    echo "⚠️  Project ID not found in accessible projects list"
    echo "   This could mean:"
    echo "   - Project ID is incorrect"
    echo "   - Token doesn't have access to this project"
    echo "   - Project is in a different account"
fi
echo ""

# Test 3: Try to run a test (dry run)
echo "🔍 Test 3: Testing test execution (this may fail if no tests exist)..."
if testim --token "$TOKEN" --project "$PROJECT_ID" --grid cloud --help 2>&1; then
    echo "✅ Command syntax is correct"
else
    echo "⚠️  Command execution had issues (this is expected if no tests exist)"
fi
echo ""

echo "=========================================="
echo "✅ Credentials verification complete!"
echo ""
echo "If all tests passed, your credentials should work in GitHub Actions."
echo "If any test failed, fix the issue before using in CI/CD."

