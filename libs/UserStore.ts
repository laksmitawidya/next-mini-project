"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthType = "credentials" | "google" | null;
type ClientSessionStatus = "authenticated" | "unauthenticated";

type UsersState = {
  user: Session["user"] | null;
  clientSessionStatus: ClientSessionStatus;
  authType: AuthType;
  clientSignIn: (userInfo: Pick<NonNullable<Session["user"]>, "email">) => void;
  clientSignOut: () => void;
  setAuthType: (type: AuthType) => void;
};

export const useUserStore = create<UsersState>()(
  persist(
    (set) => ({
      user: null,
      clientSessionStatus: "unauthenticated",
      authType: null,

      clientSignIn: (userInfo) => {
        const user = {
          image: "https://picsum.photos/200/300?random=1",
          name: "Client Test",
          email: userInfo.email,
        };
        set(() => ({
          user,
          clientSessionStatus: "authenticated",
        }));

        // Make sure that the auth is happened on the server
        // so that we can protect the server route
        signIn("credentials", { ...user, callbackUrl: "/users" });
      },

      clientSignOut: async () => {
        // Make sure that the auth is happened on the server
        // so that we can protect the server route
        await signOut({ callbackUrl: "/login" });
        set(() => ({
          user: null,
          clientSessionStatus: "unauthenticated",
          authType: null,
        }));
      },

      setAuthType: (type) => {
        set(() => ({
          authType: type,
        }));
      },
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        user: state.user,
        clientSessionStatus: state.clientSessionStatus,
        authType: state.authType,
      }),
    }
  )
);
