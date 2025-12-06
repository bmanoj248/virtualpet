# How to Get Testim Project ID and API Token

This guide shows you exactly where to find your Testim Project ID and how to create an API Token for CI/CD integration.

## 🎯 Quick Steps

### 1. Get Your Project ID

**Method A: From Testim Dashboard**
1. Go to [https://app.testim.io](https://app.testim.io) and log in
2. Select your project from the dropdown (top left corner)
3. Click on **Settings** (gear icon or in the left sidebar)
4. Go to **General** or **Project Settings**
5. Find **Project ID** - it looks like: `abc123def456` or `12345678-1234-1234-1234-123456789abc`
6. Copy it!

**Method B: From URL**
1. When viewing your project in Testim, look at the browser URL
2. It will look like: `https://app.testim.io/#/project/YOUR_PROJECT_ID/tests`
3. The `YOUR_PROJECT_ID` part is what you need
4. Copy it from the URL

**Method C: Using CLI**
```bash
# After logging in with: testim login
testim projects list
# This will show all your projects with their IDs
```

### 2. Create an API Token

1. In Testim Dashboard, go to **Settings**
2. Navigate to **API & Integrations** (or **API Keys**)
3. Click **"Create Token"** or **"Generate New Token"**
4. Fill in:
   - **Name**: Give it a descriptive name (e.g., "GitHub Actions CI/CD")
   - **Permissions**: Select "Read" and "Execute" (for running tests)
5. Click **"Create"** or **"Generate"**
6. **⚠️ IMPORTANT**: Copy the token immediately - you won't see it again!
7. Store it somewhere safe (you'll add it to GitHub Secrets next)

**Can't find API Tokens?**
- Check **Account Settings** instead of Project Settings
- Some plans have it under **Integrations** → **API**
- Contact Testim support if you still can't find it

### 3. Add to GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** (top menu)
3. Go to **Secrets and variables** → **Actions**
4. Click **"New repository secret"**

**Add Secret 1:**
- **Name**: `TESTIM_PROJECT_ID`
- **Value**: Paste your Project ID
- Click **"Add secret"**

**Add Secret 2:**
- Click **"New repository secret"** again
- **Name**: `TESTIM_API_TOKEN`
- **Value**: Paste your API Token
- Click **"Add secret"**

✅ Done! Your secrets are now available in GitHub Actions as:
- `${{ secrets.TESTIM_PROJECT_ID }}`
- `${{ secrets.TESTIM_API_TOKEN }}`

## 📝 Example Usage

### In GitHub Actions Workflow

```yaml
- name: Run Testim Tests
  env:
    TESTIM_PROJECT_ID: ${{ secrets.TESTIM_PROJECT_ID }}
    TESTIM_API_TOKEN: ${{ secrets.TESTIM_API_TOKEN }}
  run: |
    npm install -g @testim/testim-cli
    testim run --project $TESTIM_PROJECT_ID --token $TESTIM_API_TOKEN
```

### In Local Terminal

```bash
export TESTIM_PROJECT_ID="your-project-id-here"
export TESTIM_API_TOKEN="your-api-token-here"
testim run --project $TESTIM_PROJECT_ID
```

### In Environment File (.env)

```bash
TESTIM_PROJECT_ID=your-project-id-here
TESTIM_API_TOKEN=your-api-token-here
```

## 🔒 Security Best Practices

1. **Never commit** Project ID or API Token to your repository
2. **Always use** GitHub Secrets for CI/CD
3. **Rotate tokens** periodically (every 90 days recommended)
4. **Use minimal permissions** - only grant what's needed
5. **Revoke unused tokens** - delete old tokens you're not using

## ❓ Troubleshooting

### "401 Authentication Error" or "Error authenticating user with token"
**This is the most common issue!** See [TESTIM_TROUBLESHOOTING.md](TESTIM_TROUBLESHOOTING.md) for detailed steps.

**Quick Fix:**
1. Go to Testim Dashboard → Settings → API & Integrations → API Tokens
2. Create a new token with **"Read"** and **"Execute"** permissions
3. Copy the token immediately
4. Update `TESTIM_API_TOKEN` secret in GitHub
5. Make sure there are no extra spaces

### "Project ID not found"
- Make sure you're logged into the correct Testim account
- Verify you're in the right project
- Check the URL method (Method B) as a backup

### "API Token invalid"
- Make sure you copied the entire token (they're long!)
- Check for extra spaces before/after
- Verify the token hasn't expired
- Create a new token if needed
- **Most common**: Token doesn't have "Execute" permission

### "Permission denied"
- Check your API token has "Execute" permission
- Verify your Testim plan includes API access
- Contact Testim support if issues persist

## 📚 Additional Resources

- [Testim API Documentation](https://help.testim.io/docs/testim-api)
- [Testim CLI Documentation](https://help.testim.io/docs/testim-cli)
- [Testim CI/CD Integration Guide](https://help.testim.io/docs/integrate-testim-to-your-ci)

---

**Need Help?** Check the main [TESTIM_INTEGRATION.md](TESTIM_INTEGRATION.md) file for more details.

