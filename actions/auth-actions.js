'use server';

async function signup(formData) {
  const email = await formData.get('email');
  const password = await formData.get('password');

  let errors = {};

  if(!email || !email.includes('@')) {
    errors.email = 'Invalid email address';
  }

  if(!password || password.trim().length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  }

  if(Object.keys(errors).length > 0) {
    return { errors };
  }

  const user = await db.insert('users').values({ email, password }).returning();
  return user;
}

export { signup };