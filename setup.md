# 🚀 Quick Setup Guide

## Step 1: Get Your OMDB API Key
1. Visit [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx)
2. Choose "FREE!" plan (1,000 requests per day)
3. Enter your email address
4. Check your email and click the activation link
5. Copy your API key

## Step 2: Create Environment File
1. Create a new file named `.env` in the project root
2. Add this line to the file:
   ```
   REACT_APP_OMDB_API_KEY=your_actual_api_key_here
   ```
3. Replace `your_actual_api_key_here` with your real API key

## Step 3: Install and Run
```bash
npm install
npm start
```

## 🎉 That's it!
Your Movie Search App should now be running at `http://localhost:3000`

## ⚠️ Troubleshooting
- If you get "API key error", double-check your `.env` file
- Make sure there are no extra spaces in your API key
- The `.env` file should be in the same directory as `package.json` 