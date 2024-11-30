"use client";

import { Button, Divider, Typography } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div className="h-screen w-screen bg-black flex gap-3 flex-col justify-center items-center">
      <div className="flex justify-center items-center gap-4">
        <WarningIcon fontSize="medium" />
        <Typography variant="h5" className="text-white">
          Unauthorized
        </Typography>
        <Divider orientation="vertical" color="grey" />

        <div className="text-white">
          You are not authorized to access this page
        </div>
      </div>
      <Button
        variant="outlined"
        onClick={() => {
          router.push("/login");
        }}
      >
        Back to Login Page
      </Button>
    </div>
  );
};
export default Page;