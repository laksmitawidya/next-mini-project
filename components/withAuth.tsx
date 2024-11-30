"use client";

import { useUserStore } from "@/libs/UserStore";
import { Utils } from "@/libs/utils";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";

const publicRoutes = { login: "/login" };
const privateRoutes = { users: "/users" };

export const withAuth = (WrappedComponent: any) => {
  return function WithAuth(props: any) {
    const pathname = usePathname();

    const userSession = Utils.getUserSession();

    if (!userSession && pathname !== publicRoutes.login) {
      return redirect(publicRoutes.login);
    }

    if (!userSession && pathname !== publicRoutes.login) {
      return null;
    }

    if (userSession && pathname === publicRoutes.login) {
      return redirect(privateRoutes.users);
    }

    return <WrappedComponent {...props} />;
  };
};
