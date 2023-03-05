import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import { userService } from '../../../libs/services/user/user.service';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialProvider({
      id: 'user-credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email', placeholder: 'Input your E-mail' },
        password: { label: 'password', type: 'password', placeholder: 'Input you password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials!;
        const user = userService.validUser(email, password);
        if (!user) return null;
        else return user;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
    updateAge: 2 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin == baseUrl) {
        return `${baseUrl}`;
      }
      return baseUrl;
    },
  },
};

export default NextAuth(authOptions);
