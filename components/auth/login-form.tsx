'use client';
import { useState } from 'react';
import { getProviders, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useInput from '../hooks/useInput';
import styles from './login-form.module.scss';

interface Props {
  providers: Awaited<ReturnType<typeof getProviders>>;
}

const LoginForm = ({ providers }: Props) => {
  const email = useInput();
  const password = useInput();

  console.log(process.env.NEXTAUTH_SECRET);

  const submitHandler = (e: any) => {
    e.preventDefault();
    signIn('user-credentials', {
      email: email.value,
      password: password.value,
      redirect: true,
      callbackUrl: process.env.BASE_URL || 'http://localhost:3000 ',
    });
    console.log('login');
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className={styles.form_container}>
          <div>
            <label htmlFor="email">Email</label>
            <input {...email} type="email" id="email" name="email" required />
            <label htmlFor="password">비밀번호</label>
            <input {...password} type="password" id="password" name="password" required />
            <button type="submit" className="bg-blue-500 w-full text-gray-100 py-2 rounded hover:bg-blue-600 transition-colors">
              로그인
            </button>
          </div>
          <div>or</div>
          <div className="bg-amber-100">
            {Object.values(providers!).map((provider) => (
              <div key={provider.id} className="bg-blue-200">
                <button
                  onClick={() =>
                    signIn(provider.id, {
                      email,
                      password,
                      callbackUrl: process.env.BASE_URL || 'http://localhost:3000 ',
                    })
                  }
                >
                  Login with {provider.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
