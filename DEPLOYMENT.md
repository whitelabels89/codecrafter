# Deployment Guide - iCoding Compute It Game

## 🚀 Render Deployment (Recommended)

### Step 1: Prepare Repository
```bash
# Add all files to Git
git add .
git commit -m "Initial commit: iCoding Compute It Game v1.0"
git push origin main
```

### Step 2: Connect to Render
1. Go to [Render.com](https://render.com)
2. Sign up/login with your GitHub account
3. Click "New +" → "Web Service"
4. Connect your repository
5. Use these settings:
   - **Name**: `icoding-compute-it`
   - **Environment**: `Node`
   - **Region**: `Singapore` (closest to Indonesia)
   - **Branch**: `main`
   - **Build Command**: `npm install && vite build && esbuild server/production-index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --outfile=dist/index.js`
   - **Start Command**: `npm start`

### Step 3: Environment Variables (Optional)
```
NODE_ENV=production
PORT=10000
```

### Step 4: Deploy
Click "Create Web Service" and wait for deployment!

## 🐳 Docker Deployment (Alternative)

### Build Docker Image
```bash
docker build -t icoding-compute-it .
docker run -p 10000:10000 icoding-compute-it
```

### Deploy to Cloud Platforms
- **Railway**: Connect GitHub repo, auto-deploys from Dockerfile
- **Fly.io**: `fly deploy` after `fly launch`
- **Heroku**: Enable container deployments
- **DigitalOcean**: Use App Platform with GitHub integration

## 🔧 Manual Server Deployment

### Prerequisites
- Node.js 18+
- PM2 for process management

### Setup
```bash
# Clone repository
git clone <your-repo-url>
cd icoding-compute-it

# Install dependencies
npm install

# Build for production
npm run build

# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start dist/index.js --name "icoding-compute-it"
pm2 startup
pm2 save
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:10000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📊 Production Checklist

### Before Deployment
- [ ] Test production build locally: `npm run build && npm start`
- [ ] Verify all routes work correctly
- [ ] Check responsive design on mobile devices
- [ ] Test all 60+ game levels
- [ ] Validate Indonesian programming commands
- [ ] Ensure proper error handling

### After Deployment
- [ ] Test live URL functionality
- [ ] Monitor performance and loading times
- [ ] Verify game mechanics work correctly
- [ ] Test level progression system
- [ ] Check mobile responsiveness
- [ ] Monitor server logs for errors

## 🚨 Troubleshooting

### Common Issues
1. **Build Timeout**: Increase build timeout in Render settings
2. **Memory Issues**: Upgrade to higher tier plan
3. **Port Binding**: Ensure PORT environment variable is set
4. **Static Files**: Verify dist/public directory exists after build

### Performance Optimization
- Enable gzip compression
- Use CDN for static assets
- Implement caching headers
- Monitor memory usage
- Consider database optimization if using PostgreSQL

## 🔐 Security Considerations

- No sensitive data in client-side code
- Use HTTPS in production
- Implement rate limiting if needed
- Validate all user inputs
- Use environment variables for configurations

## 📝 Monitoring

### Render Logs
```bash
# View logs in Render dashboard
# Or use CLI: render logs <service-name>
```

### Health Checks
- Default endpoint: `GET /`
- Game functionality: `GET /game`
- API status: `GET /api/health` (if implemented)

---

**Ready to deploy your educational programming game!** 🎮