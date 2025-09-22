# Flynzo Innovation Private Limited - Production Deployment Script
Write-Host "🚀 Starting Flynzo Production Deployment..." -ForegroundColor Green

# Check if Vercel CLI is installed
try {
    vercel --version | Out-Null
    Write-Host "✅ Vercel CLI found" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Red
    npm install -g vercel
}

# Build the project
Write-Host "📦 Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed. Please check errors." -ForegroundColor Red
    exit 1
}

# Deploy to Vercel
Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Yellow
vercel --prod

Write-Host "🎉 Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Set environment variables in Vercel dashboard" -ForegroundColor White
Write-Host "2. Change default admin password" -ForegroundColor White
Write-Host "3. Test all functionality" -ForegroundColor White
Write-Host ""
Write-Host "🔑 Default Admin Credentials:" -ForegroundColor Yellow
Write-Host "Email: Info.flynzo@gmail.com" -ForegroundColor White
Write-Host "Password: admin123" -ForegroundColor White
Write-Host "⚠️  CHANGE IMMEDIATELY AFTER DEPLOYMENT!" -ForegroundColor Red
