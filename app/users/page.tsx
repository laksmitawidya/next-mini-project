import Paging from "@/components/clients/Paging";
import UserCard from "@/components/clients/user/UserCard";
import { UserResponse } from "@/types/common";
import withServerSideAuth from "../../components/routes/withServerAuth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User List Page",
  description: "User List Page",
};

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

export default withServerSideAuth(UsersPage);
