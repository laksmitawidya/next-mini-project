"use client";

import GoogleIcon from "@mui/icons-material/Google";
import { Box, Button, Card, CardContent } from "@mui/material";
import { signIn } from "next-auth/react";

export const LoginCard = () => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card>
        <CardContent>
          <Button
            onClick={async () => {
              signIn("google", { callbackUrl: "/" });
            }}
            startIcon={<GoogleIcon />}
          >
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};
