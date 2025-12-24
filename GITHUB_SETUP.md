# GitHub Setup Instructions

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `Web_Lab_8_9`
3. Description (optional): "Course Management API with Express.js and MongoDB"
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **Create repository**

## Step 2: Connect and Push

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/Web_Lab_8_9.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Alternative: Using SSH (if you have SSH keys set up)

```bash
git remote add origin git@github.com:YOUR_USERNAME/Web_Lab_8_9.git
git branch -M main
git push -u origin main
```

## Quick Command (Copy-paste after creating repo)

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/Web_Lab_8_9.git
git branch -M main
git push -u origin main
```

---

**Note:** If you haven't set up Git credentials, GitHub may ask for authentication. You can use:
- Personal Access Token (recommended)
- GitHub CLI
- SSH keys

