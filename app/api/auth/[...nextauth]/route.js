// Setting up providers like google Auth with next auth

import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email
      })
  
      session.user.id = sessionUser._id.toString();
  
      return session;
    },
    async signIn({ profile }) {
      // Serverless route. opens up only when it gets called
      try {
        await connectToDB();
        // check is user exist
        const userExist = await User.findOne({
          email: profile.email
        });
  
        // if not create user and save to the database
        if(!userExist) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }

})

export { handler as GET, handler as POST };