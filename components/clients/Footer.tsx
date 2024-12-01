"use client";

import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Avatar, IconButton, Paper } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Session } from "next-auth";
import Image from "next/image";

const Footer = ({ userSession }: { userSession?: Session["user"] | null }) => {
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
        <div className="flex justify-between bg-slate-200 w-full h-full p-10">
          <div className="flex flex-col w-full justify-center gap-y-2">
            <Image
              src="/ara-logo.png"
              alt="No logo found"
              height={24}
              width={100}
            />
            <div className="text-sm">
              Technical Test by @laksmitawidya © {currentDate.getFullYear()} •
              Copyright: Ara App
            </div>
          </div>
          <div className="flex">
            <AvatarIcon
              href="https://github.com/laksmitawidya"
              icon={<GitHubIcon />}
            />
            <AvatarIcon
              href={`mailto:${userSession?.email}`}
              icon={<EmailIcon />}
            />
            <AvatarIcon
              href="https://www.linkedin.com/in/laksmita-widya-astuti-4a392010b/"
              icon={<LinkedInIcon />}
            />
          </div>
        </div>
      </Paper>
    </footer>
  );
};

const AvatarIcon = ({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) => {
  return (
    <IconButton size="small" href={href} color="inherit">
      <Avatar sx={{ bgcolor: blue[900], width: 40, height: 40 }}>{icon}</Avatar>
    </IconButton>
  );
};

export default Footer;
