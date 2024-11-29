"use client";

import { UserResponse } from "@/types/common";
import { create } from "zustand";

type UsersState = {
  users: UserResponse[];
  selectedUser: UserResponse | null;
  fetchUserDetail: (id: number) => void;
};

export const useStore = create<UsersState>((set) => ({
  users: [],
  selectedUser: null,
  fetchUserDetail: (id) => {
    set((state) => {
      const user = state.users?.find((user) => user.id === id) || null;
      return { selectedUser: user };
    });
  },
}));
