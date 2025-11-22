'use server';

import { createUser } from '../lib/user';
import { redirect } from 'next/navigation';
import { createAuthSession } from '../lib/auth';
import { getUserByEmail } from '../lib/user';
import { verifyPassword } from '../lib/hash';

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


export async function login(prevState, formData) {
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
  
  const user = getUserByEmail(email);

  if(!user) {
    return { 
      errors: {
        email: 'Invalid email address'
      }
    };
  }

  const isPasswordValid = verifyPassword(user.password, password);

  if(!isPasswordValid) {
    return { 
      errors: {
        password: 'Invalid password'
      }
    };
  }

  await createAuthSession(user.id);

  redirect('/training');
}


export async function auth(mode, prevState, formData) {
  if(mode === 'login') {
    return await login(prevState, formData);
  }
  if(mode === 'signup') {
    return await signup(prevState, formData);
  }
}