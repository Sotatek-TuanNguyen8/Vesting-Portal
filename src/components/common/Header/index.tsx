import { Button, useMediaQuery } from "@material-ui/core";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import UserNav from "./UserNav";
import NavMobile from "./NavMobile";
import { Logo, MenuMobile } from "@/assets/svgs";
import useMetaMask from "@/utils/hooks/useMetaMask";
type Props = {};

export const Header = ({}: Props) => {
  const router = useRouter();
  const { pathname } = router;

  const [navMobile, setNavMobile] = useState<boolean>(false);

  const isActive = (value: string) => {
    return pathname === value && styles.active;
  };

  const isMobile = useMediaQuery("(max-width: 1200px)");

  const openNavMobile = () => {
    setNavMobile(true);
  };

  const closeNavMobile = () => {
    setNavMobile(false);
  };

  return (
    <div className={styles.header}>
      <Logo width={200} height={69} />
      {isMobile ? (
        <MenuMobile onClick={openNavMobile} />
      ) : (
        <>
          <div className={styles.nav}>
            <Link href="/">
              <div className={clsx(isActive("/"), styles.item)}>STAKING/LP</div>
            </Link>
            <Link href="/">
              <div className={clsx(isActive("/2"), styles.item)}>CLAIMING</div>
            </Link>
            <Link href="/">
              <div className={clsx(isActive("/3"), styles.item)}>
                ADD LIQUIDITY
              </div>
            </Link>
            <Link href="/lend">
              <div className={clsx(isActive("/lend"), clsx(styles.item))}>
                LEND
              </div>
            </Link>
          </div>
          <UserNav />
        </>
      )}
      {navMobile && isMobile && (
        <NavMobile open={navMobile} handleClose={closeNavMobile} />
      )}
      <Button onClick={connect}>Connect Wallet</Button>
    </div>
  );
};
