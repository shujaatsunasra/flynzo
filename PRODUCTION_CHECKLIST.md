# 🚀 Production Deployment Checklist

## Pre-Deployment Checklist

### ✅ Environment Setup
- [ ] Supabase project created
- [ ] Database schema executed (`supabase-schema.sql`)
- [ ] Environment variables configured
- [ ] Admin user created (default: Info.flynzo@gmail.com / admin123)

### ✅ Security
- [ ] Admin authentication implemented
- [ ] Password hashing enabled
- [ ] Row Level Security (RLS) enabled in Supabase
- [ ] Protected admin routes
- [ ] Session management configured

### ✅ Content
- [ ] All international content replaced with Indian destinations
- [ ] Company information updated (Flynzo Innovation Private Limited)
- [ ] Contact details updated
- [ ] Testimonials updated with Indian customers

### ✅ Performance
- [ ] Error boundaries implemented
- [ ] Loading states added
- [ ] SEO meta tags optimized
- [ ] Sitemap generation configured
- [ ] Image optimization enabled

### ✅ Deployment
- [ ] Vercel CLI installed
- [ ] Project built successfully (`npm run build`)
- [ ] Environment variables set in Vercel
- [ ] Domain configured (if custom domain)

## Post-Deployment Checklist

### ✅ Testing
- [ ] Website loads correctly
- [ ] All pages accessible
- [ ] Admin login works
- [ ] Admin panel functions properly
- [ ] Data updates reflect on website
- [ ] Mobile responsiveness verified

### ✅ Security
- [ ] Change default admin password
- [ ] Test admin authentication
- [ ] Verify protected routes
- [ ] Check HTTPS enforcement

### ✅ SEO & Analytics
- [ ] Sitemap accessible (`/sitemap.xml`)
- [ ] Robots.txt accessible (`/robots.txt`)
- [ ] Meta tags displaying correctly
- [ ] Google Analytics configured (if needed)

## Production URLs

- **Main Website**: `https://your-domain.vercel.app`
- **Admin Login**: `https://your-domain.vercel.app/admin/login`
- **Admin Panel**: `https://your-domain.vercel.app/admin`
- **Sitemap**: `https://your-domain.vercel.app/sitemap.xml`

## Default Admin Credentials

⚠️ **CHANGE IMMEDIATELY AFTER DEPLOYMENT**

- **Email**: `Info.flynzo@gmail.com`
- **Password**: `admin123`

## Support & Maintenance

### Regular Tasks
- [ ] Monitor website performance
- [ ] Update content through admin panel
- [ ] Backup database regularly
- [ ] Monitor security logs

### Emergency Contacts
- **Technical Issues**: Check Vercel deployment logs
- **Database Issues**: Check Supabase dashboard
- **Content Updates**: Use admin panel

## Environment Variables Required

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=https://your-domain.vercel.app
```

## Deployment Commands

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Deploy to Vercel
vercel --prod

# Set up admin user (if needed)
npm run setup-admin
```

---

**Note**: This checklist ensures a smooth production deployment with all security and performance optimizations in place.
