# 🚀 Quick Deployment Guide

Follow these steps to deploy your portfolio in **~15 minutes**!

## Step 1: Push Code to GitHub (If Not Done)

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

## Step 2: Deploy Backend to Render (5 min)

1. Go to https://render.com and **sign up with GitHub**
2. Click **"New +"** → **"Web Service"**
3. **Connect** your GitHub repository
4. Fill in:
   - **Name**: `portfolio-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn server:app --host 0.0.0.0 --port $PORT`
5. **Environment Variables** → Add:
   - `MONGO_URL` = `mongodb+srv://username:password@cluster.mongodb.net/` (get from MongoDB Atlas)
   - `DB_NAME` = `portfolio_db`
   - `CORS_ORIGINS` = `https://your-frontend.vercel.app` (add this AFTER deploying frontend)
6. Click **"Create Web Service"**
7. **Wait for deployment** and copy your URL (e.g., `https://portfolio-backend.onrender.com`)

## Step 3: Deploy Frontend to Vercel (5 min)

1. Go to https://vercel.com and **sign up with GitHub**
2. Click **"Add New..."** → **"Project"**
3. **Import** your GitHub repository
4. Configure:
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `frontend` ⚠️ **IMPORTANT**: Click "Edit" and change this!
   - **Build Command**: `npm run build --legacy-peer-deps`
   - **Output Directory**: `build`
5. **Environment Variables** → Add:
   - `REACT_APP_BACKEND_URL` = Your Render backend URL from Step 2
6. Click **"Deploy"**
7. **Copy your Vercel URL** (e.g., `https://your-app.vercel.app`)

## Step 4: Update CORS (2 min)

1. Go back to **Render** → Your backend service
2. **Environment** → Update `CORS_ORIGINS`:
   ```
   https://your-app.vercel.app
   ```
3. Click **"Save Changes"** (auto-redeploys)

## Step 5: Test! (1 min)

- Visit your Vercel URL
- Open DevTools → Console
- Check for errors

## ✅ Done!

Your portfolio is live! Share your Vercel URL with anyone.

---

## 📝 MongoDB Atlas Setup (If Needed)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free cluster (M0)
3. **Database Access** → Create user
4. **Network Access** → Add IP `0.0.0.0/0`
5. **Connect** → Copy connection string
6. Replace `<password>` with your actual password

---

**Need Help?** See `DEPLOYMENT_GUIDE.md` for detailed troubleshooting.

