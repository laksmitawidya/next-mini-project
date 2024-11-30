"use client";

import { useUserStore } from "@/libs/UserStore";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Avatar, Divider } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { MouseEvent, useState } from "react";
import { withSession } from "./withSession";

export interface HeaderProps {
  appTitle: string;
  userSession?: Session["user"] | null;
}

const Header = ({ appTitle, userSession }: HeaderProps) => {
  const { authType, clientSignOut } = useUserStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" color="default">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {appTitle}
        </Typography>

        <div>
          Hello {userSession?.name}!
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            {userSession?.image ? (
              <Avatar className="headerOption_icon">
                {userSession.image ? (
                  <Image
                    src={userSession.image}
                    alt={userSession.name ?? ""}
                    fill
                    sizes="40px"
                    style={{ borderRadius: "50%" }}
                  />
                ) : (
                  userSession.name
                )}
              </Avatar>
            ) : (
              <AccountCircle />
            )}
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <div className="p-4">
              <div className="headerInfo">
                <div className="font-bold text-md">{userSession?.name}</div>
                <div className="fontBold">{userSession?.email}</div>
              </div>
            </div>
            <Divider />
            <MenuItem
              onClick={async () => {
                // if (authType === "email") {
                //   await clientSignOut();
                //   redirect("/login");
                // }
                // if (authType === "google") {
                await clientSignOut();

                await signOut({ callbackUrl: "/login" });
                // }
                handleClose();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default withSession(Header);
