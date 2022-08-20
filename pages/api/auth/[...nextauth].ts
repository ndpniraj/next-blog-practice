import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!email || !password) throw new Error("username/password missing!");

        const user = await User.findOne({ email });
        if (!user) throw new Error("email/password does not match!");

        const isMatched = await user.comparePassword(password);
        if (!isMatched) throw new Error("email/password does not match!");

        return {
          name: user.name,
          email: user.email,
          role: user.role,
          id: user._id,
        };
      },
    }),
  ],
  pages: {
    signIn: "/?auth=signin",
    error: "/404",
  },
  callbacks: {
    jwt(params) {
      // update token
      if (params.user?.role) {
        params.token.role = params.user.role;
        params.token.id = params.user.id;
      }
      // return final_token
      return params.token;
    },
    // signIn({ user, account, profile, credentials, email }) {
    //   // props.user => the user object returned from authorized
    //   // props.account => provider info in this case the credentials
    //   // credentials => info which are coming from frontend username, password, csrfToken, redirect url and accept type
    //   // profile => if oauth is used then oauth profile will be there
    //   // email => if the email provider is used

    //   // here we will get all the info of user like from credentials to the properties returned from authorized function
    //   // we have to return true if we want to move further if false then user can't be logged in.
    //   if (user.username !== "john") throw new Error("you are not authorized");
    //   return true;
    // },
    session({ session, token }) {
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
        (session.user as { role: string }).role = token.role as string;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
