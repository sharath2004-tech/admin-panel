# 🚀 Render.com Backend Deployment Guide

## Prerequisites Checklist
Before starting, ensure you have:
- [ ] Render.com account (free) - https://render.com/register
- [ ] GitHub account (to connect repository)
- [ ] MongoDB Atlas database URL
- [ ] Cloudinary account credentials
- [ ] PayPal sandbox credentials
- [ ] Mailjet account credentials
- [ ] OneSignal account credentials

---

## STEP 1: Get MongoDB Atlas URL (5 minutes)

### 1.1 Create MongoDB Atlas Account
```
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google or email
3. Choose "Free Shared Cluster"
4. Select cloud provider: AWS
5. Region: Choose closest to you
6. Cluster name: "sharath-property"
7. Click "Create Cluster" (takes 1-3 minutes)
```

### 1.2 Create Database User
```
1. Click "Database Access" in left menu
2. Click "Add New Database User"
3. Authentication Method: Password
4. Username: sharath_admin
5. Password: Click "Autogenerate" and COPY IT
6. Database User Privileges: "Atlas admin"
7. Click "Add User"
```

### 1.3 Whitelist IP Address
```
1. Click "Network Access" in left menu
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere"
4. IP: 0.0.0.0/0
5. Click "Confirm"
```

### 1.4 Get Connection String
```
1. Go back to "Database" (left menu)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Driver: Node.js, Version: 5.5 or later
5. Copy the connection string
6. Replace <password> with your actual password from step 1.2
7. Replace <dbname> with: sharath_property

Final format:
mongodb+srv://sharath_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/sharath_property?retryWrites=true&w=majority
```

**✅ SAVE THIS - You'll need it in Step 4**

---

## STEP 2: Setup Render.com Account (2 minutes)

```
1. Go to: https://render.com/register
2. Click "Sign up with GitHub" (recommended)
3. Authorize Render to access your GitHub
4. Complete profile setup
```

---

## STEP 3: Prepare Backend Code (Optional - 3 minutes)

### Option A: Deploy from GitHub (Recommended)

```bash
# Initialize git in backend folder
cd api(backend)
git init
git add .
git commit -m "Initial commit - Sharath Property Backend"

# Create GitHub repository
# Go to: https://github.com/new
# Repository name: sharath-property-backend
# Make it Private
# Don't initialize with README
# Click "Create repository"

# Push code to GitHub
git remote add origin https://github.com/YOUR_USERNAME/sharath-property-backend.git
git branch -M main
git push -u origin main
```

### Option B: Deploy without GitHub (Manual Upload)
```
Skip this step - Render will let you upload code directly
```

---

## STEP 4: Deploy Backend to Render (10 minutes)

### 4.1 Create New Web Service
```
1. Go to Render Dashboard: https://dashboard.render.com/
2. Click "New +" button (top right)
3. Select "Web Service"
```

### 4.2 Connect Repository

**If using GitHub:**
```
1. Click "Connect" next to your repository
2. Select: sharath-property-backend
```

**If NOT using GitHub:**
```
1. Click "Public Git repository"
2. Enter your repository URL or select "Deploy from source code"
3. Upload your api(backend) folder
```

### 4.3 Configure Service Settings
```
Name: sharath-property-backend
Region: Oregon (US West) or closest to you
Branch: main
Root Directory: (leave empty if backend is in root, or type: api(backend))
Runtime: Node
Build Command: npm install && npm run build
Start Command: npm run start:prod
Plan: Free
```

### 4.4 Add Environment Variables (IMPORTANT!)

Click "Advanced" → "Add Environment Variable" and add these:

```env
NODE_ENV=production

MONGO_URL=<paste-your-mongodb-url-from-step-1.4>

JWT_SECRET=sharath_jwt_secret_2024_random_secure_key_change_this

JWT_EXPIRE=30d

CLOUDINARY_API_KEY=<your-cloudinary-key>
CLOUDINARY_API_SECRET=<your-cloudinary-secret>
CLOUDINARY_CLOUD_NAME=<your-cloud-name>

PAYPAL_CLIENT_ID=<your-paypal-client-id>
PAYPAL_CLIENT_SECRET=<your-paypal-client-secret>

MAILJET_API_KEY=<your-mailjet-key>
MAILJET_API_SECRET=<your-mailjet-secret>
EMAIL_SENDER=noreply@sharath-property.com

ONE_SIGNAL_API_KEY=<your-onesignal-key>
ONE_SIGNAL_APP_ID=<your-onesignal-app-id>
ONE_SIGNAL_BASE_URL=https://onesignal.com/api/v1
```

**Quick API Keys Guide:**

1. **Cloudinary** (Free): https://cloudinary.com/users/register/free
   - After signup, go to Dashboard
   - Copy: Cloud Name, API Key, API Secret

2. **PayPal** (Sandbox): https://developer.paypal.com/home
   - Create app in sandbox
   - Copy: Client ID and Secret

3. **Mailjet** (Free): https://www.mailjet.com/signup
   - Go to Account → API Keys
   - Copy: API Key and Secret Key

4. **OneSignal** (Free): https://onesignal.com/
   - Create new app
   - Copy: App ID and REST API Key

### 4.5 Deploy!
```
1. Click "Create Web Service"
2. Render will start building and deploying
3. Wait 5-10 minutes for first deployment
4. Watch the logs for any errors
```

---

## STEP 5: Verify Deployment (2 minutes)

### 5.1 Check Deployment Status
```
1. In Render dashboard, check if status shows "Live" (green)
2. Copy your service URL (e.g., https://sharath-property-backend.onrender.com)
```

### 5.2 Test API
Open these URLs in your browser:

```
1. Health Check: https://YOUR-SERVICE-URL.onrender.com/
2. API Docs: https://YOUR-SERVICE-URL.onrender.com/api/docs
```

If you see the Swagger documentation, **SUCCESS!** ✅

---

## STEP 6: Save Your Backend URL

**IMPORTANT:** Copy your backend URL and save it:

```
Backend URL: https://sharath-property-backend.onrender.com
```

You'll need this for:
- Admin panel .env file
- Mobile app configuration

---

## Common Issues & Solutions

### Issue 1: Build Failed
**Check logs for:**
- Missing dependencies → Check package.json
- TypeScript errors → Run `npm run build` locally first
- Node version mismatch → Add `NODE_VERSION=18` to env vars

### Issue 2: Service Starts Then Crashes
**Check logs for:**
- MongoDB connection failed → Verify MONGO_URL is correct
- Port issues → Render automatically sets PORT, don't hardcode it
- Missing environment variables → Check all required vars are set

### Issue 3: Can't Connect to MongoDB
**Solution:**
```
1. Go to MongoDB Atlas
2. Network Access → Add IP Address
3. Allow access from anywhere: 0.0.0.0/0
4. Wait 1-2 minutes for changes to propagate
5. Restart Render service
```

### Issue 4: Service is Slow
**This is normal for free tier:**
- Render free tier spins down after 15 minutes of inactivity
- First request after idle takes 30-60 seconds to "wake up"
- Subsequent requests are fast

---

## Next Steps

After backend is deployed:

1. **Update Admin Panel .env:**
   ```env
   VITE_REACT_APP_BACKEND_URL=https://YOUR-BACKEND-URL.onrender.com
   ```

2. **Update Mobile App:**
   Edit `mobile_app/lib/const/setting.dart`:
   ```dart
   static const String baseUrl = "https://YOUR-BACKEND-URL.onrender.com";
   ```

3. **Create Admin User in MongoDB:**
   - Use MongoDB Compass or Atlas web interface
   - Insert admin user in `users` collection
   - Hash password with bcrypt

4. **Test Everything:**
   - Login to admin panel
   - Create a test property
   - Verify file uploads work
   - Test all features

---

## Cost & Limits (Free Tier)

**Render Free Tier Includes:**
- ✅ 750 hours/month (enough for 1 service)
- ✅ Auto-deploy from GitHub
- ✅ Custom domain support
- ✅ SSL certificates
- ⚠️ Spins down after 15 min inactivity
- ⚠️ Slower response times
- ⚠️ 400 build hours/month

**MongoDB Atlas Free Tier:**
- ✅ 512 MB storage
- ✅ Shared cluster
- ✅ Perfect for testing/development

---

## Support

**Render Documentation:**
- Getting Started: https://render.com/docs
- Node.js Guide: https://render.com/docs/deploy-node-express-app
- Environment Variables: https://render.com/docs/environment-variables

**Need Help?**
- Render Community: https://community.render.com/
- MongoDB Atlas Support: https://docs.atlas.mongodb.com/

---

## Checklist ✅

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Connection string obtained
- [ ] Render account created
- [ ] Backend code pushed to GitHub (or ready to upload)
- [ ] Web service created on Render
- [ ] All environment variables added
- [ ] Service deployed successfully (shows "Live")
- [ ] API docs accessible
- [ ] Backend URL saved
- [ ] Admin panel .env updated
- [ ] Mobile app config updated

---

**Estimated Total Time: 20-25 minutes**

**Status after completion: Backend LIVE and ready! 🚀**
