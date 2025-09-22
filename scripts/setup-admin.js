const bcrypt = require('bcryptjs');
const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupAdmin() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'Info.flynzo@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const adminName = 'Flynzo Admin';

    // Hash the password
    const passwordHash = await bcrypt.hash(adminPassword, 12);

    // Check if admin already exists
    const { data: existingAdmin, error: checkError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', adminEmail)
      .single();

    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user
    const { data, error } = await supabase
      .from('admin_users')
      .insert([
        {
          email: adminEmail,
          password_hash: passwordHash,
          name: adminName,
          role: 'admin'
        }
      ])
      .select();

    if (error) {
      console.error('Error creating admin user:', error);
      return;
    }

    console.log('Admin user created successfully:');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    console.log('Name:', adminName);
    console.log('\nPlease change the default password after first login!');

  } catch (error) {
    console.error('Setup error:', error);
  }
}

setupAdmin();
