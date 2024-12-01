import UserDetail from "@/components/clients/user/UserDetail";
import withServerSideAuth from "@/components/routes/withServerAuth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Detail: Show user by id",
  description: "User Detail Page",
};

const fetchUserDetail = async (id: number) => {
  const res = await fetch(`https://reqres.in/api/users/${id}`);
  try {
    const data = await res.json();
    return { data };
  } catch (error) {
    return { error: "Fetching Failed" };
  }
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const userDetail = await fetchUserDetail(Number(slug));

  return (
    <>
      {userDetail?.data.data && <UserDetail {...userDetail.data.data} />}
      {userDetail?.error && (
        <div className="text-red-700">{userDetail?.error}</div>
      )}
    </>
  );
};

export default withServerSideAuth(Page);
