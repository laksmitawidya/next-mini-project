import UserCard from "@/components/user/UserCard";
import { UserResponse } from "@/types/common";

const fetchUsers = async () => {
  const res = await fetch("https://reqres.in/api/users");
  try {
    const data = await res.json();
    return { data };
  } catch (error) {
    return { error: "Fetching Failed" };
  }
};

const Page = async () => {
  const usersResponse = await fetchUsers();

  return (
    <div className="p-5">
      <div className="text-4xl mb-10">Users</div>
      <div className="flex flex-wrap gap-5 ">
        {usersResponse?.data?.data.map((item: UserResponse) => {
          return <UserCard {...item} />;
        })}
      </div>

      {usersResponse?.error && (
        <div className="text-red-700">{usersResponse?.error}</div>
      )}
    </div>
  );
};

export default Page;
