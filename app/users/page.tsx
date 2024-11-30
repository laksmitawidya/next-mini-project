import Paging from "@/components/Paging";
import UserCard from "@/components/user/UserCard";
import { UserResponse } from "@/types/common";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const fetchUsers = async ({ page }: { page: number }) => {
  const res = await fetch(`https://reqres.in/api/users?page=${page}`);
  try {
    const data = await res.json();
    return { data };
  } catch (error) {
    return { error: "Fetching Failed" };
  }
};

const UsersPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const usersResponse = await fetchUsers({
    page: searchParams?.page ? Number(searchParams?.page) : 1,
  });

  const session = await getServerSession();

  if (!session) {
    redirect("/unauthorized");
  }

  return (
    <div className="p-5">
      <div className="text-4xl mb-10">Users</div>
      <div className="flex flex-wrap gap-5 ">
        {usersResponse?.data?.data?.map((item: UserResponse) => {
          return <UserCard key={item.id} {...item} />;
        })}
      </div>

      {usersResponse?.error && (
        <div className="text-red-700">{usersResponse?.error}</div>
      )}

      <Paging totalPages={usersResponse?.data?.total_pages || 0} />
    </div>
  );
};

export default UsersPage;
