"use client";

import { CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const publicRoutes = { login: "/login" };

export const withAuth = (WrappedComponent: any) => {
  return function WithAuth(props: any) {
    const { status } = useSession();
    const pathname = usePathname();
    const router = useRouter();

    if (status === "authenticated") {
      if (pathname === "/") {
        return router.push("/users");
      }

      if (pathname === publicRoutes.login) {
        return router.push("/users");
      }
    }

    if (status === "unauthenticated") {
      if (pathname !== publicRoutes.login) {
        return router.push(publicRoutes.login);
      }
    }

    return <WrappedComponent {...props} />;
  };
};
