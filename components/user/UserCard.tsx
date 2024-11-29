"use client";

import { UserResponse } from "@/types/common";
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
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
      <CardMedia
        image="/static/images/cards/contemplative-reptile.jpg"
        title="Users"
      />
      <CardContent>
        <div className="flex gap-x-3">
          <Avatar sx={{ width: 56, height: 56 }} className="headerOption_icon">
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
          <div>
            <Typography gutterBottom variant="h5" component="div">
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
