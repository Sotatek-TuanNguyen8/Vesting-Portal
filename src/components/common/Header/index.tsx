import { useMediaQuery } from "@material-ui/core";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { LogoHeader } from "../../../assets/svgs";
import NavbarAction from "./NavbarAction";
import NavbarRoute from "./NavbarRoute";
import useStyles from "./style";
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

  const isMobile = useMediaQuery("(max-width: 1000px)");

  const openNavMobile = () => {
    setNavMobile(true);
  };

  const closeNavMobile = () => {
    setNavMobile(false);
  };

  return (
    <div className={classes.header}>
      <p className={classes.headerContent}>
        📖 December Market Recap and what’s to come 🔥 Read the full report here
        👉 Read here 🔥
      </p>
      <div className={classes.nav}>
        <LogoHeader />
        <div className={classes.navLink}>
          <NavbarRoute />
          <NavbarAction />
        </div>
      </div>

      {/* {isNav && (
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

      {isMobile && <NavMobile open={navMobile} handleClose={closeNavMobile} />} */}
      {/* <Button onClick={connect}>Connect Wallet</Button> */}
    </div>
  );
};
