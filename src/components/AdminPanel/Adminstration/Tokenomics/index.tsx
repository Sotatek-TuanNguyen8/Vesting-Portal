import React from "react";
import Administration from "..";
import AdminPanel from "../..";
import Header from "../../Header";

import useStyles from "./style";
import AdminLayout from "../../../admin-auth/layoutAdmin/index";

type Props = {};

export default function Tokenomics({}: Props) {
  const styles = useStyles();
  return (
    <div>
      <AdminLayout>
        <AdminPanel />
        <div className={styles.container}>
          <Administration active={"tokenomics"} />
          <div>Tokenomics</div>
        </div>
      </AdminLayout>
    </div>
  );
}
