import { useSession } from "next-auth/react";
import { useUserStore } from "./UserStore";

export class Utils {
  // Notes:
  // - useSession is for server authentication (google oauth 2)
  // - useUserStore is for client authentication to satisfy the login flow mechanism implementation

  static getUserSession = () => {
    const { data, status } = useSession();
    const { authType, user } = useUserStore();
    const authUser =
      authType === "google"
        ? data?.user
        : authType === "credentials"
        ? user
        : null;

    return { status, authUser };
  };
}
