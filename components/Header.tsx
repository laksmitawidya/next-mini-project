"use client";

import AccountCircle from "@mui/icons-material/AccountCircle";
import { Avatar, Divider } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { MouseEvent, useState } from "react";

export interface HeaderProps {
  appTitle: string;
  user?: {
    image?: string | null;
    name?: string | null;
    email?: string | null;
  };
}

const Header = ({ appTitle, user }: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {appTitle}
          </Typography>

          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              {user?.image ? (
                <Avatar className="headerOption_icon">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name ?? ""}
                      fill
                      sizes="40px"
                      style={{ borderRadius: "50%" }}
                    />
                  ) : (
                    user.name
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
                  <div>{user?.name}</div>
                  <div className="fontBold">{user?.email}</div>
                </div>
              </div>
              <Divider />
              <MenuItem
                onClick={async () => {
                  await signOut({ callbackUrl: "/login" });
                  handleClose();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
