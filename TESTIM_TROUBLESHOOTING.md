# Testim Authentication Troubleshooting Guide

## 401 Authentication Error

If you're seeing this error:
```
Error: cannot POST /executions/initialize (401)
Error authenticating user with token
```

This means your API token is **invalid, expired, or missing required permissions**.

## Step-by-Step Fix

### Step 1: Verify Token Exists in Testim

1. Go to [Testim Dashboard](https://app.testim.io)
2. Log in to your account
3. Navigate to **Settings** → **API & Integrations** → **API Tokens**
4. Check if you have an active token
5. If no token exists, create one (see Step 2)

### Step 2: Create a New API Token

1. In Testim Dashboard → **Settings** → **API & Integrations** → **API Tokens**
2. Click **"Create Token"** or **"Generate New Token"**
3. Fill in:
   - **Name**: `GitHub Actions CI/CD` (or any descriptive name)
   - **Permissions**: 
     - ✅ **Read** (required)
     - ✅ **Execute** (required for running tests)
4. Click **"Create"** or **"Generate"**
5. **⚠️ IMPORTANT**: Copy the token **immediately** - you won't see it again!
6. Store it somewhere safe temporarily

### Step 3: Verify Token Permissions

Make sure your token has:
- ✅ **Read** permission
- ✅ **Execute** permission

If it only has Read, it won't be able to run tests.

### Step 4: Update GitHub Secret

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Find **`TESTIM_API_TOKEN`** in the list
4. Click **"Update"** (or create it if it doesn't exist)
5. **Delete the old value completely**
6. Paste the **new token** (make sure there are no extra spaces)
7. Click **"Update secret"**

### Step 5: Verify Project ID

Also verify your Project ID is correct:

1. In Testim Dashboard, open your project
2. Check the URL: `https://app.testim.io/#/project/YOUR_PROJECT_ID/tests`
3. Copy the `YOUR_PROJECT_ID` part
4. Go to GitHub → **Settings** → **Secrets** → **Actions**
5. Find **`TESTIM_PROJECT_ID`**
6. Update it if it doesn't match

### Step 6: Test the Token Locally (Optional)

You can test if your token works before using it in GitHub Actions:

```bash
# Install Testim CLI
npm install -g @testim/testim-cli

# Test authentication
testim --token "YOUR_TOKEN" --project "YOUR_PROJECT_ID" --grid cloud --help
```

If this works, your token is valid. If it fails with 401, the token is invalid.

## Common Issues

### Issue 1: Token Copied Incorrectly
- **Problem**: Extra spaces or missing characters
- **Solution**: Copy the token again, make sure to get the entire token

### Issue 2: Token Expired
- **Problem**: Old token that was revoked or expired
- **Solution**: Create a new token and update the secret

### Issue 3: Wrong Permissions
- **Problem**: Token only has "Read" permission
- **Solution**: Create a new token with both "Read" and "Execute" permissions

### Issue 4: Wrong Project ID
- **Problem**: Project ID doesn't match your Testim project
- **Solution**: Verify the Project ID from the Testim URL and update the secret

### Issue 5: Token Belongs to Different Account
- **Problem**: Token was created in a different Testim account
- **Solution**: Make sure you're using a token from the correct account

## Verification Checklist

Before running the workflow again, verify:

- [ ] API token exists in Testim Dashboard
- [ ] Token has "Read" and "Execute" permissions
- [ ] Token is copied correctly (no extra spaces)
- [ ] `TESTIM_API_TOKEN` secret is updated in GitHub
- [ ] `TESTIM_PROJECT_ID` secret matches your project
- [ ] You're logged into the correct Testim account

## Still Not Working?

If you've followed all steps and still get 401:

1. **Create a completely new token** (delete the old one first)
2. **Double-check the Project ID** from the Testim URL
3. **Verify you're in the correct Testim account/organization**
4. **Check Testim support documentation**: [Testim CLI Docs](https://help.testim.io/docs/the-command-line-cli)
5. **Contact Testim Support** if the issue persists

## Security Notes

- ⚠️ **Never commit tokens to your repository**
- ✅ **Always use GitHub Secrets** for sensitive data
- ✅ **Rotate tokens periodically** (every 90 days recommended)
- ✅ **Revoke unused tokens** to maintain security

---

**Last Updated**: Troubleshooting guide for 401 authentication errors

