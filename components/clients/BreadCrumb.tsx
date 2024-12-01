"use client";

import HomeIcon from "@mui/icons-material/Home";
import { Button } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { usePathname, useRouter } from "next/navigation";

const Breadcrumb = () => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  const routes = useRouter();
  return (
    <div className="flex p-5 mt-[64px] bg-slate-200">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" className="text-slate-900 font-bold">
          <HomeIcon />
        </Link>

        {pathNames.map((link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join("/")}`;

          let itemLink = link[0].toUpperCase() + link.slice(1);

          return (
            <Button
              className={`!min-w-0 ${paths === href && "!font-bold"}`}
              size="small"
              key={index}
              onClick={() => {
                routes.replace(href);
              }}
            >
              {itemLink}
            </Button>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
