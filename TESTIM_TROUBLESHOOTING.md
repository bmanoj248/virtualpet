# Testim Authentication Troubleshooting Guide

## Authentication and Project Access Errors

### 401 Authentication Error

If you're seeing this error:
```
Error: cannot POST /executions/initialize (401)
Error authenticating user with token
```

This means your API token is **invalid, expired, or missing required permissions**.

### 400 Bad Request Error

If you're seeing this error:
```
Error: cannot POST /executions/initialize (400)
error fetching user info for the project
```

This means:
- ✅ Your API token is **valid** (authentication passed)
- ❌ But there's an issue with the **Project ID** or your **access to that project**

**Common causes:**
1. **Wrong Project ID** - The Project ID doesn't match your Testim project
2. **No access to project** - The token belongs to a user who doesn't have access to this project
3. **Project doesn't exist** - The Project ID points to a non-existent or deleted project
4. **Wrong account/organization** - The token and project are in different accounts

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

## Fixing 400 "error fetching user info for the project"

### Step 1: Verify Project ID

1. Go to [Testim Dashboard](https://app.testim.io)
2. **Make sure you're logged into the correct account**
3. Select your project from the dropdown (top left)
4. Check the URL: `https://app.testim.io/#/project/YOUR_PROJECT_ID/tests`
5. Copy the `YOUR_PROJECT_ID` part exactly
6. Compare it with your GitHub secret `TESTIM_PROJECT_ID`
7. They must match **exactly** (case-sensitive, no extra spaces)

### Step 2: Verify Project Access

1. In Testim Dashboard, make sure you can see and access the project
2. Try opening the project - if you can't see it, you don't have access
3. Check if you're in the correct organization/workspace
4. Verify the project exists and is active (not deleted)

### Step 3: Verify Token Belongs to Same Account

1. The API token must be created in the **same account** as the project
2. If you have multiple Testim accounts, make sure:
   - Token is from Account A
   - Project is in Account A
   - Not mixing Account A token with Account B project

### Step 4: List Projects Using CLI

You can verify your token can see the project:

```bash
# Install Testim CLI
npm install -g @testim/testim-cli

# List all projects accessible with your token
testim projects list --token "YOUR_TOKEN"
```

This will show all projects your token can access. Make sure your Project ID is in the list.

### Step 5: Update GitHub Secret

1. Go to GitHub → Settings → Secrets → Actions
2. Find `TESTIM_PROJECT_ID`
3. Click "Update"
4. Delete the old value
5. Paste the **exact** Project ID from the Testim URL
6. Make sure there are no extra spaces
7. Click "Update secret"

## Still Not Working?

If you've followed all steps and still get errors:

**For 401 errors:**
1. **Create a completely new token** (delete the old one first)
2. Make sure token has **"Read" AND "Execute"** permissions
3. **Verify you're in the correct Testim account/organization**

**For 400 errors:**
1. **Double-check the Project ID** from the Testim URL (must match exactly)
2. **Verify project access** - make sure you can see the project in dashboard
3. **Test token access** using `testim projects list --token "YOUR_TOKEN"`
4. **Ensure token and project are in the same account**

5. **Check Testim support documentation**: [Testim CLI Docs](https://help.testim.io/docs/the-command-line-cli)
6. **Contact Testim Support** if the issue persists

## Security Notes

- ⚠️ **Never commit tokens to your repository**
- ✅ **Always use GitHub Secrets** for sensitive data
- ✅ **Rotate tokens periodically** (every 90 days recommended)
- ✅ **Revoke unused tokens** to maintain security

---

**Last Updated**: Troubleshooting guide for 401 authentication errors

