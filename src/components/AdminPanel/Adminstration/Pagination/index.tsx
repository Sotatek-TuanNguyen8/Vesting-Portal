import { Pagination } from "@mui/material";
import React from "react";
import useStyles from "./style";

type Props = { count: number; onChange: (page: number) => void; page: number };

export default function PaginationCustom({ count, onChange, page }: Props) {
  const classes = useStyles();
  const handleChange = (e: React.ChangeEvent<unknown>, page: number) => {
    onChange(page);
  };

  return (
    <div className={classes.pagination}>
      <Pagination
        count={count}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
        page={page}
      />
    </div>
  );
}
