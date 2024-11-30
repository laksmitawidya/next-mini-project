"use client";

import { Session } from "next-auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthType = "email" | "google" | null;
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
        set(() => ({
          user: {
            image: "https://picsum.photos/200/300?random=1", 
            name: "Client Test", 
            email: userInfo.email,
          },
          clientSessionStatus: "authenticated",
        }));
      },

      clientSignOut: () => {
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
