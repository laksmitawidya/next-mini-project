"use client";

import { withAuth } from "@/components/routes/withAuth";
import { useUserStore } from "@/libs/UserStore";
import GoogleIcon from "@mui/icons-material/Google";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const { setAuthType, clientSignIn } = useUserStore();

  return (
    <Box className="flex w-screen h-screen">
      <div className="bg-slate-300 w-1/2 p-10 flex justify-center items-center">
        <Card className="p-5 w-2/3">
          <CardContent>
            <div className="flex justify-center items-center flex-col gap-y-5">
              <Typography variant="h3">Sign In</Typography>{" "}
              <div>Enter your email and password</div>
              <TextField
                required
                id="outlined-controlled"
                fullWidth
                label="Email"
                inputProps={{
                  type: "email",
                }}
                helperText={
                  emailError ? (
                    <span className="text-red-500">
                      Please enter a valid email
                    </span>
                  ) : (
                    ""
                  )
                }
                value={email}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(event.target.value);
                  if (event.target.validity.valid) {
                    setEmailError(false);
                  } else {
                    setEmailError(true);
                  }
                }}
              />
              <TextField
                required
                id="outlined-controlled"
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(event.target.value);
                }}
              />
              <Button
                fullWidth
                disabled={!email || !password}
                variant="outlined"
                onClick={async () => {
                  setAuthType("credentials");
                  clientSignIn({
                    email,
                  });
                }}
              >
                Sign in
              </Button>
              <Divider orientation="horizontal" variant="middle" flexItem>
                OR
              </Divider>
              <Button
                fullWidth
                variant="outlined"
                onClick={async () => {
                  signIn("google", { callbackUrl: "/users" });
                  setAuthType("google");
                }}
                startIcon={<GoogleIcon />}
              >
                Sign in with Google
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="relative w-1/2">
        <Image
          className="object-cover"
          src="https://picsum.photos/id/106/1000/800"
          alt="bg-image"
          fill
        />
      </div>
    </Box>
  );
};

export default withAuth(Page);
