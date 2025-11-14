# Deployment Guide

## Deploying to Vercel

This project is configured for easy deployment on Vercel.

### Quick Deploy

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Test locally**:
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` to see the component showcase.

3. **Deploy to Vercel**:

   **Option A: Using Vercel CLI**
   ```bash
   npm i -g vercel
   vercel
   ```

   **Option B: Using GitHub Integration**
   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and deploy

   **Option C: Using Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository or upload the project folder
   - Vercel will auto-detect Next.js settings

### Configuration

The project includes:
- `vercel.json` - Vercel configuration
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration

### Build Settings

Vercel will automatically detect:
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Environment Variables

No environment variables are required for basic deployment.

### Custom Domain

After deployment, you can add a custom domain in the Vercel project settings.

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

