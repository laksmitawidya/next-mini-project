"use client";

import HomeIcon from "@mui/icons-material/Home";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { usePathname } from "next/navigation";
import { withSession } from "./withSession";

const Breadcrumb = () => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  return (
    <div className="flex p-5  mt-[64px]">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" className="text-slate-900 font-bold">
          <HomeIcon />
        </Link>

        {pathNames.map((link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join("/")}`;
          let itemClasses = `hover:underline font-bold text-stone-500 ${
            paths === href && "text-slate-900"
          }`;
          let itemLink = link[0].toUpperCase() + link.slice(1);

          return (
            <Link
              key={index}
              underline="hover"
              href={href}
              className={itemClasses}
            >
              {itemLink}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default withSession(Breadcrumb);
