"use client";

import { Pagination } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Paging = ({ totalPages }: { totalPages: number }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams.toString());
  const pathname = usePathname();
  const defaultPage = params.get("page") ? Number(params.get("page")) : 1;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    params.set("page", String(value));
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="p-5 flex justify-end">
      <Pagination
        count={totalPages}
        color="primary"
        defaultPage={defaultPage}
        onChange={handleChange}
      />
    </div>
  );
};

export default Paging;
