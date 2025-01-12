"use client";

import { Utils } from "@/libs/utils";
import { CircularProgress } from "@mui/material";
import { redirect, usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import Loading from "../server/Loading";

// This page is only to handle the client side
const publicRoutes = { login: "/login" };
const privateRoutes = { users: "/users" };

const withAuth = (WrappedComponent: React.FC<any>) => {
  return function ClientSideComponent(props: any) {
    const pathname = usePathname();
    const router = useRouter();

    const { authUser, status } = Utils.getUserSession();

    if (
      pathname === publicRoutes.login &&
      !authUser &&
      status === "authenticated"
    ) {
      return <Loading />;
    }

    if (
      !authUser &&
      pathname !== publicRoutes.login &&
      status === "unauthenticated"
    ) {
      router.replace(publicRoutes.login);
      return null;
    }

    if (
      authUser &&
      pathname === publicRoutes.login &&
      status === "authenticated"
    ) {
      router.replace(privateRoutes.users);
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
        <WrappedComponent {...props} userSession={authUser} />
      </Suspense>
    );
  };
};

export default withAuth;
