#!/bin/bash

# Flynzo Innovation Private Limited - Production Deployment Script
echo "🚀 Starting Flynzo Production Deployment..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please check errors."
    exit 1
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "🎉 Deployment complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Set environment variables in Vercel dashboard"
echo "2. Change default admin password"
echo "3. Test all functionality"
echo ""
echo "🔑 Default Admin Credentials:"
echo "Email: Info.flynzo@gmail.com"
echo "Password: admin123"
echo "⚠️  CHANGE IMMEDIATELY AFTER DEPLOYMENT!"
