'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { nextBackendClient } from '../../libs/api-client/next-backend-api.client';

const SignupForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /** Todo: extract validate */
    if (name === '' || email === '' || password === '' || passwordRepeat === '') {
      return;
    }

    const response = await nextBackendClient.post('users', { name, email, password });
    router.push('/');
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

            <label className="text-gray-700" htmlFor="name">
              닉네임
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full py-2 bg-gray-50 text-gray-500 px-1 outline-none mb-4"
              type="text"
              id="name"
              name="name"
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

            <label className="text-gray-700" htmlFor="password-repeat">
              비밀번호 확인
            </label>
            <input
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
              className="w-full py-2 bg-gray-50 text-gray-500 px-1 outline-none mb-4"
              type="password"
              id="password-repeat"
              name="password-repeat"
              required
            />

            <button type="submit" className="bg-blue-500 w-full text-gray-100 py-2 rounded hover:bg-blue-600 transition-colors">
              회원가입
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
