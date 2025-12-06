# Quick Setup: Azure Deployment Token

## ⚠️ Current Issue

Your workflow is failing because `AZURE_STATIC_WEB_APPS_API_TOKEN` secret is missing.

## ✅ Solution: Add the Token (2 Minutes)

### Step 1: Get Token from Azure Portal

1. **Go to Azure Portal**: https://portal.azure.com
2. **Search for "Static Web Apps"** in the top search bar
3. **Click on your Static Web App** (or create one if you don't have it)
4. **In the left sidebar**, look for one of these:
   - **"Overview"** → Scroll down to find **"Deployment token"**
   - **"Manage deployment token"** (direct link)
5. **Click "Copy"** or **"Show"** next to the deployment token
6. **Copy the entire token** (it's a long string)

### Step 2: Add to GitHub Secrets

1. **Go to your GitHub repository**: https://github.com/manuram/virtualpet
2. **Click "Settings"** (top menu bar)
3. **Click "Secrets and variables"** → **"Actions"** (left sidebar)
4. **Click "New repository secret"** (top right button)
5. **Fill in:**
   - **Name**: `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - **Value**: Paste the token you copied from Azure
6. **Click "Add secret"**

### Step 3: Verify

1. You should now see `AZURE_STATIC_WEB_APPS_API_TOKEN` in your secrets list
2. **Push any change** to `main` branch (or re-run the failed workflow)
3. Deployment should work automatically!

## 🎯 Visual Guide

**Azure Portal:**
```
Static Web App → Overview → Deployment token → [Copy]
```

**GitHub:**
```
Repository → Settings → Secrets → Actions → New secret
Name: AZURE_STATIC_WEB_APPS_API_TOKEN
Value: [Paste token]
```

## 🔍 Can't Find the Token?

### Option A: Create Static Web App (if you don't have one)

1. Go to Azure Portal → **"Create a resource"**
2. Search for **"Static Web App"**
3. Click **"Create"**
4. Fill in:
   - **Name**: `pixelpaw-app` (or your choice)
   - **Resource Group**: Create new
   - **Plan**: Free
   - **Source**: GitHub
   - **Repository**: `manuram/virtualpet`
   - **Branch**: `main`
5. Click **"Review + create"** → **"Create"**
6. Azure will **automatically add the token** to your GitHub secrets!

### Option B: Get Token from Existing App

If you already have a Static Web App but can't find the token:

1. Go to your Static Web App in Azure Portal
2. Look for **"Deployment"** or **"Manage deployment token"** in the left menu
3. The token should be visible there

## ⚡ Quick Test

After adding the token, you can:

1. **Re-run the failed workflow** in GitHub Actions
2. Or **make a small change** and push to `main`
3. The deployment should succeed!

## 📝 Alternative: Skip Deployment (Not Recommended)

If you don't want to deploy right now, you can modify the workflow to skip when the token is missing:

```yaml
skip_deploy_on_missing_secrets: true
```

But it's better to add the token so deployments work automatically.

---

**Need Help?** See [AZURE_DEPLOYMENT_TOKEN.md](AZURE_DEPLOYMENT_TOKEN.md) for more details.

