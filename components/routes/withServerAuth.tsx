import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "../server/Loading";

const withServerSideAuth = (WrappedComponent: React.FC<any>) => {
  return async function ServerSideComponent(props: any) {
    const session = await getServerSession();

    if (!session) {
      await redirect("/unauthorized");
    }

    return (
      <Suspense fallback={<Loading />}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };
};

export default withServerSideAuth;
