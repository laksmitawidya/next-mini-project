"use client";

import { Utils } from "@/libs/utils";
import { CircularProgress } from "@mui/material";
import { redirect, usePathname } from "next/navigation";
import { Suspense } from "react";

// This page is only to handle the client side
const publicRoutes = { login: "/login" };
const privateRoutes = { users: "/users" };

const withAuth = (WrappedComponent: React.FC<any>) => {
  return function ClientSideComponent(props: any) {
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

    if (userSession && pathname === publicRoutes.login) {
      return null;
    }

    return (
      <Suspense
        fallback={
          <div className="flex w-full h-full justify-center items-center bg-slate-100">
            <CircularProgress />
            <span className="sr-only">Loading...</span>
          </div>
        }
      >
        <WrappedComponent {...props} userSession={userSession} />
      </Suspense>
    );
  };
};

export default withAuth;
