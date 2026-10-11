import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const globalForMongo = globalThis as unknown as { _mongo?: MongoClient };

const client =
  globalForMongo._mongo ??
  new MongoClient(process.env.MONGODB_URI || "mongodb://localhost:27017/bazardor");
if (process.env.NODE_ENV !== "production") globalForMongo._mongo = client;

export const auth = betterAuth({
  database: mongodbAdapter(client.db()),
  // email verification & forgot-password are intentionally NOT enabled
  emailAndPassword: { enabled: true, autoSignIn: false },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
