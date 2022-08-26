import { useMediaQuery } from "@material-ui/core";
import clsx from "clsx";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo, MenuMobile } from "../../../assets/svgs";
import NavMobile from "./NavMobile";
import useStyles from "./style";
import UserConnect from "./UserConnect";
import UserNav from "./UserNav";
type Props = {
  isNav?: boolean;
};

export const Header = ({ isNav = false }: Props) => {
  const location = useLocation();
  const { pathname } = location;
  const classes = useStyles();
  const [navMobile, setNavMobile] = useState<boolean>(false);

  const isActive = (value: string) => {
    return pathname === value && "active";
  };

  const isMobile = useMediaQuery("(max-width: 1200px)");

  const openNavMobile = () => {
    setNavMobile(true);
  };

  const closeNavMobile = () => {
    setNavMobile(false);
  };

  return (
    <div className={classes.header}>
      <Logo />
      {isNav && (
        <>
          {isMobile ? (
            <div onClick={openNavMobile}>
              <MenuMobile />
            </div>
          ) : (
            <>
              <div className={classes.nav}>
                <Link to="/" className={clsx(isActive("/2"), "item")}>
                  STAKING/LP
                </Link>
                <Link to="/" className={clsx(isActive("/"), "item")}>
                  CLAIMING
                </Link>
                <Link to="/" className={clsx(isActive("/3"), "item")}>
                  ADD LIQUIDITY
                </Link>
                <Link to="/" className={clsx(isActive("/4"), clsx("item"))}>
                  LEND
                </Link>
              </div>
              <UserNav />
            </>
          )}
        </>
      )}

      {!isNav && <UserConnect />}

      {navMobile && isMobile && (
        <NavMobile open={navMobile} handleClose={closeNavMobile} />
      )}
      {/* <Button onClick={connect}>Connect Wallet</Button> */}
    </div>
  );
};
