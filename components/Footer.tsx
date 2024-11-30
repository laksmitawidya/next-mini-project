"use client";

import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Avatar, IconButton, Paper } from "@mui/material";
import { Session } from "next-auth";
import { withSession } from "./withSession";

const Footer = (userInfo: Session["user"] | null) => {
  const currentDate = new Date();
  return (
    <footer>
      <Paper
        sx={{
          bottom: 0,
          left: 0,
          right: 0,
        }}
        elevation={3}
      >
        <div className="flex justify-between bg-black/5 w-full h-full p-5">
          <div className="flex flex-col w-full justify-center">
            <div className="font-bold">
              Ara Technical Test by @laksmitawidya
            </div>
            <div>© {currentDate.getFullYear()} Copyright: Ara App</div>
          </div>
          <div className="flex">
            <IconButton
              size="small"
              href="https://github.com/laksmitawidya"
              color="inherit"
            >
              <Avatar>
                <GitHubIcon />
              </Avatar>
            </IconButton>
            <IconButton
              size="small"
              href={`mailto:${userInfo?.email}`}
              color="inherit"
            >
              <Avatar>
                <EmailIcon />
              </Avatar>
            </IconButton>
            <IconButton
              size="small"
              href="https://www.linkedin.com/in/laksmita-widya-astuti-4a392010b/"
              color="inherit"
            >
              <Avatar>
                <LinkedInIcon />
              </Avatar>
            </IconButton>
          </div>
        </div>
      </Paper>
    </footer>
  );
};

export default withSession(Footer);
