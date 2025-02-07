import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JSON_HEADER } from "./lib/constants/api.contstans";

export const authOption: NextAuthOptions = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your password",
        },
      },

      authorize: async (credentials) => {
        const baseUrl = process.env.API + "/auth/signin";
        const response = await fetch(baseUrl, {
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          method: "POST",
          cache: "no-store",
          headers: {
            ...JSON_HEADER,
          },
        });
        const payload: ApiResponse<LoginResponse> = await response.json();

        // If the login is successfull
        if (typeof payload === "object" && !("code" in payload)) {
          return {
            id: payload?.user?._id,
            token: payload?.token,
            ...payload?.user,
          };
        }

        // If the is not successfull
        throw new Error(payload?.message || "Login fail please try later!");
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.accessToken = user.token;
        token._id = user._id;
        token.username = user.username;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.phone = user.phone;
        token.role = user.role;
        token.isVerified = user.isVerified;
        token.createdAt = user.createdAt;
        token.passwordResetCode = user.passwordChangedAt;
        token.passwordResetExpires = user.passwordResetExpires;
        token.resetCodeVerified = user.resetCodeVerified;
        token.passwordChangedAt = user.passwordChangedAt;
      }
      return token;
    },

    session: ({ session, token }) => {
      session._id = token._id;
      session.username = token.username;
      session.firstName = token.firstName;
      session.lastName = token.lastName;
      session.email = token.email;
      session.phone = token.phone;
      session.role = token.role;
      session.isVerified = token.isVerified;
      session.createdAt = token.createdAt;
      session.passwordResetCode = token.passwordChangedAt;
      session.passwordResetExpires = token.passwordResetExpires;
      session.resetCodeVerified = token.resetCodeVerified;
      session.passwordChangedAt = token.passwordChangedAt;
      return session;
    },
  },
};
