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

const UserDetail = ({
  avatar,
  first_name,
  last_name,
  email,
  id,
}: UserResponse) => {
  return (
    <div className="w-full h-full p-5">
      <Card className="min-w-[320px]">
        <CardMedia
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Users"
        />
        <CardContent>
          <div className="flex gap-x-10">
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
            <div>
              <Typography gutterBottom variant="h5" component="div">
                {first_name} {last_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {email}
              </Typography>
              <div className="mt-5">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro
                tenetur laboriosam unde, exercitationem vitae nisi similique
                maxime eligendi eveniet ipsam dignissimos dolores ipsa, quasi,
                nostrum laudantium quis consequatur nam explicabo.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetail;
