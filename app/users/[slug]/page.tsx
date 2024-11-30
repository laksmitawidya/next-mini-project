import UserDetail from "@/components/user/UserDetail";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
  const session = await getServerSession();

  if (!session) {
    redirect("/unauthorized");
  }

  return (
    <>
      {userDetail?.data.data && <UserDetail {...userDetail.data.data} />}
      {userDetail?.error && (
        <div className="text-red-700">{userDetail?.error}</div>
      )}
    </>
  );
};

export default Page;
