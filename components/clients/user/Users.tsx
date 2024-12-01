"use client";

import { UserResponse, UsersResponseProps } from "@/types/common";
import Paging from "../Paging";
import UserCard from "./UserCard";
import { withAuth } from "../../routes/withAuth";

const Users = async (usersResponse: {
  error: string | undefined;
  data?: UsersResponseProps;
}) => {
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

export default Users;
