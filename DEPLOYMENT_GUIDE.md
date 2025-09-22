# Flynzo Innovation Private Limited - Production Deployment Guide

## 🚀 Complete Production Setup & Deployment Instructions

### 1. Supabase Setup

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note down your project URL and anon key

2. **Database Setup**
   - Go to SQL Editor in your Supabase dashboard
   - Run the SQL from `supabase-schema.sql` file
   - This will create all necessary tables and insert default data

3. **Environment Variables**
   - Copy your Supabase URL and keys
   - You'll need these for Vercel deployment

### 2. Local Development Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

### 3. Vercel Deployment

1. **Login to Vercel**
   ```bash
   vercel login
   ```

2. **Deploy Project**
   ```bash
   vercel
   ```

3. **Set Environment Variables in Vercel**
   - Go to your project dashboard on Vercel
   - Navigate to Settings > Environment Variables
   - Add the following variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`

4. **Redeploy**
   ```bash
   vercel --prod
   ```

### 4. Admin Panel Access

- **Login URL**: `https://your-domain.vercel.app/admin/login`
- **Default Credentials**:
  - Email: `Info.flynzo@gmail.com`
  - Password: `admin123`
  - **⚠️ IMPORTANT**: Change the default password immediately after first login!

- **Admin Features**:
  - Secure authentication with NextAuth.js
  - Manage destinations
  - Manage tours
  - Manage testimonials
  - Update company information
  - Manage story elements
  - Real-time updates without code deployment

### 5. Production Features Implemented

✅ **Security & Authentication**
- Secure admin authentication with NextAuth.js
- Password hashing with bcryptjs
- Protected admin routes
- Session management

✅ **Unified Indian Content**
- All international references replaced with Indian destinations
- Updated testimonials with Indian customers
- Updated contact information for Flynzo Innovation Private Limited
- SEO-optimized meta tags for Indian market

✅ **Supabase Integration**
- Dynamic data fetching from Supabase
- Secure admin panel for content management
- Real-time updates without code changes
- Row Level Security (RLS) enabled

✅ **Admin Control**
- Full CRUD operations for all content
- Secure authentication required
- Easy-to-use interface
- No technical knowledge required

✅ **Production Optimizations**
- Error boundaries for graceful error handling
- Loading states and spinners
- SEO optimization with sitemap generation
- Performance optimizations
- Production-ready build configuration

✅ **Deployment Ready**
- Vercel configuration with environment variables
- Production environment setup
- Admin user setup script
- Comprehensive deployment documentation

### 6. Database Schema

The database includes:
- `destinations` - Indian tour destinations
- `tours` - Featured tour packages
- `testimonials` - Customer reviews
- `company_info` - Company details
- `story_elements` - Story section content
- `admin_users` - Admin authentication (future enhancement)

### 7. Next Steps

1. **Set up Supabase project** and run the schema
2. **Configure environment variables**
3. **Deploy to Vercel**
4. **Access admin panel** to customize content
5. **Test all functionality**

### 8. Support

For any issues:
- Check Supabase connection
- Verify environment variables
- Check Vercel deployment logs
- Ensure database schema is properly set up

---

**Note**: The admin panel is currently open (no authentication). For production, implement proper authentication in the admin panel.
