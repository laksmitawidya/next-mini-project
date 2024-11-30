"use client";

import { Utils } from "@/libs/utils";

export const withSession = (WrappedComponent: any) => {
  return function WithSession(props: any) {
    
    const userSession = Utils.getUserSession();

    if (!userSession) return null;

    return <WrappedComponent {...props} userSession={userSession} />;
  };
};
