'use server';

import { createUser } from '../lib/user';
import { redirect } from 'next/navigation';
import { createAuthSession } from '../lib/auth';

export async function signup(prevState, formData) {
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
    return { 
        errors: errors
     };
  }

  const hashedPassword = hashUserPassword(password);

  try {
    const userId = createUser(email, hashedPassword);

    await createAuthSession(userId);

    redirect('/training');
    
  } catch (error) {
    if(error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return { 
        errors: {
           email: 'Email already exists' 
        }
     };
    }
    throw error;
  }

}
