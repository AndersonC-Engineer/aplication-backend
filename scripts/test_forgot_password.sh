#!/usr/bin/env bash
# scripts/test_forgot_password.sh
# Simple test script to call the forgot-password endpoint using env variables from .env

set -euo pipefail

# load .env if present
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

BASE_URL=${BASE_URL:-http://localhost:3000}
API_URL="$BASE_URL/api/auth/forgot-password"
EMAIL_TO=${1:-${TEST_EMAIL:-larteas0@gmail.com}}

echo "POST $API_URL with email=$EMAIL_TO"

curl -sS -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL_TO\"}" \
  | jq || true

exit 0
