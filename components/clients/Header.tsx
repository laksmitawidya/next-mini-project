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
import Image from "next/image";
import { MouseEvent, useState } from "react";

export interface HeaderProps {
  userSession?: Session["user"] | null;
}

const Header = ({ userSession }: HeaderProps) => {
  const { clientSignOut } = useUserStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar color="default" position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Image
            src="/ara-logo.png"
            alt="No logo found"
            height={32}
            width={120}
          />
        </Typography>

        <div className="flex gap-x-1 justify-center">
          <span className="invisible sm:visible flex justify-center items-center">
            Hello {userSession?.name}!
          </span>
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
                await clientSignOut();
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

export default Header;
