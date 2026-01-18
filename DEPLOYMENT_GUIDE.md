# Deployment Guide - Portfolio Website

This guide will help you deploy your portfolio website to free hosting platforms.

## 🎯 Quick Deploy Overview

1. **Frontend (React)** → Vercel (Recommended) or Netlify
2. **Backend (FastAPI)** → Render or Railway  
3. **Database (MongoDB)** → MongoDB Atlas (Free tier)

---

## 📋 Pre-Deployment Checklist

- [ ] All code pushed to GitHub
- [ ] MongoDB Atlas account created (or connection string ready)
- [ ] Environment variables documented

---

## 🗄️ Step 1: Setup MongoDB Atlas (If Not Done)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a **Free Cluster (M0)**
4. **Database Access**: Create a database user (save username/password)
5. **Network Access**: Add IP `0.0.0.0/0` (allow all IPs) for now
6. **Connect**: Click "Connect" → "Connect your application"
7. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
8. Replace `<password>` with your actual password

**Your MongoDB connection string format:**
```
mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/
```

---

## 🚀 Step 2: Deploy Backend to Render

### Option A: Using Render Dashboard

1. **Sign up** at https://render.com (use GitHub account)

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository

3. **Configure Service**:
   - **Name**: `portfolio-backend` (or any name)
   - **Region**: Choose closest to you
   - **Branch**: `main` (or `master`)
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn server:app --host 0.0.0.0 --port $PORT`

4. **Add Environment Variables** (in Render dashboard):
   ```
   MONGO_URL=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/
   DB_NAME=portfolio_db
   CORS_ORIGINS=https://your-frontend-url.vercel.app,https://your-frontend-url.netlify.app
   ```
   ⚠️ **Note**: Replace `CORS_ORIGINS` with your actual frontend URL after deploying frontend

5. **Click "Create Web Service"**

6. **Wait for deployment** (takes 5-10 minutes)

7. **Copy your backend URL** (e.g., `https://portfolio-backend.onrender.com`)

### Option B: Using render.yaml (Alternative)

If you prefer, Render can auto-detect `render.yaml` in your repo root. Just push it to GitHub.

---

## 🌐 Step 3: Deploy Frontend to Vercel

### Method 1: Vercel Dashboard

1. **Sign up** at https://vercel.com (use GitHub account)

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Import your GitHub repository

3. **Configure Project**:
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `frontend` (click "Edit" and set this)
   - **Build Command**: `npm run build --legacy-peer-deps`
   - **Output Directory**: `build`

4. **Add Environment Variable**:
   - Name: `REACT_APP_BACKEND_URL`
   - Value: Your Render backend URL (from Step 2)
     ```
     https://portfolio-backend.onrender.com
     ```

5. **Click "Deploy"**

6. **Wait for deployment** (takes 2-5 minutes)

7. **Copy your frontend URL** (e.g., `https://your-app.vercel.app`)

### Method 2: Vercel CLI (Alternative)

```bash
cd frontend
npm install -g vercel
vercel
```

---

## 🔄 Step 4: Update CORS and Environment Variables

After deploying both:

1. **Update Backend CORS** (in Render dashboard):
   - Go to your Render service → Environment
   - Update `CORS_ORIGINS` to include your Vercel frontend URL:
     ```
     https://your-app.vercel.app,https://your-app.vercel.app
     ```
   - Click "Save Changes" (will auto-redeploy)

2. **Verify Frontend Environment Variable** (in Vercel):
   - Settings → Environment Variables
   - Ensure `REACT_APP_BACKEND_URL` is set correctly
   - If changed, go to Deployments → ... → Redeploy

---

## 🧪 Step 5: Test Your Deployment

1. **Test Backend**: 
   - Visit: `https://your-backend.onrender.com/api/`
   - Should see: `{"message": "Hello World"}`

2. **Test Frontend**:
   - Visit your Vercel URL
   - Open browser DevTools → Network tab
   - Check if API calls to backend are working

---

## 🔧 Alternative: Railway (Backend)

If you prefer Railway over Render:

1. Go to https://railway.app and sign up
2. **New Project** → Deploy from GitHub
3. Select your repository
4. **Add Service** → Select `backend` directory
5. **Variables** tab → Add:
   - `MONGO_URL` = your MongoDB connection string
   - `DB_NAME` = `portfolio_db`
   - `CORS_ORIGINS` = your frontend URL
6. **Settings** → Generate Domain
7. Railway auto-detects Python and runs the app

---

## 🐛 Troubleshooting

### Backend Issues:
- **"MongoDB connection failed"**: Check `MONGO_URL` in Render, ensure password is correct
- **"Port already in use"**: Render provides `$PORT` env var - make sure you use it in start command
- **"Module not found"**: Ensure `requirements.txt` includes all dependencies

### Frontend Issues:
- **"Cannot connect to backend"**: Check `REACT_APP_BACKEND_URL` in Vercel environment variables
- **CORS errors**: Update `CORS_ORIGINS` in backend to include frontend URL
- **Build fails**: Check Vercel build logs, ensure `--legacy-peer-deps` is used if needed

### General:
- **Environment variables not loading**: Ensure variable names match exactly (case-sensitive)
- **Changes not reflecting**: Clear browser cache or hard refresh (Ctrl+Shift+R)

---

## 📝 Summary of URLs to Save

After deployment, you'll have:
- **Frontend URL**: `https://your-app.vercel.app`
- **Backend URL**: `https://portfolio-backend.onrender.com`
- **MongoDB Atlas**: Your connection string

Save these for future reference!

---

## 🎉 You're Done!

Your portfolio is now live and accessible worldwide! Share your Vercel URL with anyone.

**Next Steps**:
- Customize your portfolio content
- Set up a custom domain (optional, Vercel supports this)
- Monitor usage (free tiers have limits but are generous)

Good luck! 🚀

