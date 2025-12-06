# Test Testim Credentials Locally

Before troubleshooting CI/CD issues, test your credentials locally to verify they work.

## Quick Test Script

I've created a test script to verify your credentials. Run it locally:

### Step 1: Install Testim CLI (if not already installed)

```bash
npm install -g @testim/testim-cli
```

### Step 2: Make the test script executable (Linux/Mac)

```bash
chmod +x test-testim-credentials.sh
```

### Step 3: Run the test script

```bash
./test-testim-credentials.sh "YOUR_TOKEN" "YOUR_PROJECT_ID"
```

**Example:**
```bash
./test-testim-credentials.sh "PAK-abc123def456..." "usw2KG96lZ"
```

### Step 4: Review the results

The script will test:
1. ✅ Token authentication (can list projects)
2. ✅ Project access (project ID is accessible)
3. ✅ Command syntax (CLI command structure)

## Manual Testing

If you prefer to test manually:

### Test 1: List Projects

```bash
testim projects list --token "YOUR_TOKEN"
```

**Expected:** List of projects your token can access

**If this fails:** Token is invalid, expired, or has wrong permissions

### Test 2: Verify Project ID

```bash
testim projects list --token "YOUR_TOKEN" | grep "YOUR_PROJECT_ID"
```

**Expected:** Your project ID appears in the list

**If this fails:** Project ID is wrong or token doesn't have access

### Test 3: Test Command Syntax

```bash
testim --token "YOUR_TOKEN" --project "YOUR_PROJECT_ID" --grid cloud --help
```

**Expected:** Help text or command executes

**If this fails:** Command syntax issue or project access problem

## Common Issues Found

### Issue 1: Token Can't List Projects
- **Cause:** Token is invalid or expired
- **Fix:** Create a new token with "Read" and "Execute" permissions

### Issue 2: Project ID Not in List
- **Cause:** Wrong Project ID or no access
- **Fix:** Get the correct Project ID from Testim URL and verify access

### Issue 3: Command Syntax Error
- **Cause:** Wrong CLI version or syntax
- **Fix:** Update Testim CLI: `npm install -g @testim/testim-cli@latest`

## What to Do After Testing

1. **If all tests pass locally:**
   - Your credentials are correct
   - The issue is likely in the GitHub Actions workflow
   - Check the workflow logs for differences

2. **If tests fail locally:**
   - Fix the credentials first
   - Don't use in CI/CD until local tests pass
   - Follow the troubleshooting steps in `TESTIM_TROUBLESHOOTING.md`

## Windows Users

If you're on Windows, you can run the script using Git Bash or WSL, or test manually using the commands above in PowerShell or Command Prompt.

---

**Next Steps:** Once local tests pass, your credentials should work in GitHub Actions. If they still fail in CI/CD, check the workflow logs for environment-specific issues.

