import NextAuth from "next-auth";

import { authOptions } from "@/libs/authOptions";

const handlers = NextAuth(authOptions);

export const GET = handlers.handlers.GET;
export const POST = handlers.handlers.POST;
