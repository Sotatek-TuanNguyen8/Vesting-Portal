import React from "react";
import useStyles from "./style";
import UserNavAdmin from "./AdminNav";

export default function Header() {
  const styles = useStyles();
  return (
    <div className={styles.header}>
      <div className="logo">
        <p className="fluid">FLUID</p>
        <span className="seperate"></span>
        <p className="admin">Administration</p>
      </div>
      <div className="profile">
        <UserNavAdmin />
      </div>
    </div>
  );
}
