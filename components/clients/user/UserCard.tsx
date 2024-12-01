"use client";

import { UserResponse } from "@/types/common";
import { Avatar, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UserCard = ({
  avatar,
  first_name,
  last_name,
  email,
  id,
}: UserResponse) => {
  const router = useRouter();
  return (
    <Card
      onClick={() => {
        router.push(`/users/${id}`);
      }}
      variant="outlined"
      className="min-w-[320px] cursor-pointer"
    >
      <CardContent>
        <div className="flex gap-x-4 items-center">
          <Avatar
            sx={{ width: 100, height: 100 }}
            className="headerOption_icon"
          >
            {avatar ? (
              <Image
                src={avatar}
                alt={first_name ?? ""}
                fill
                style={{ borderRadius: "50%" }}
              />
            ) : (
              first_name
            )}
          </Avatar>
          <div className="flex flex-col">
            <Typography variant="h5" component="div">
              {first_name} {last_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {email}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
