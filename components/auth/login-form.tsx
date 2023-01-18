'use client';
import { useState } from 'react';
import { getProviders, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Props {
  providers: Awaited<ReturnType<typeof getProviders>>;
}

const LoginForm = ({ providers }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e: any) => {
    e.preventDefault();
    signIn('user-credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: process.env.BASE_URL || 'http://localhost:3000 ',
    });
    console.log('login');
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="w-96 p-6 shadow-sm bg-white">
          <div className="flex flex-col">
            <label className="text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 bg-gray-50 text-gray-500 px-1 outline-none mb-4"
              type="email"
              id="email"
              name="email"
              required
            />

            <label className="text-gray-700" htmlFor="password">
              비밀번호
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 bg-gray-50 text-gray-500 px-1 outline-none mb-4"
              type="password"
              id="password"
              name="password"
              required
            />

            <button type="submit" className="bg-blue-500 w-full text-gray-100 py-2 rounded hover:bg-blue-600 transition-colors">
              로그인
            </button>
          </div>
        </div>
      </form>
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
    </>
  );
};

export default LoginForm;
