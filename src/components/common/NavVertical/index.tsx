import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as CommunityIcon } from "../../../assets/svgs/nav-vertical/community.svg";
import { ReactComponent as FollowTradeIcon } from "../../../assets/svgs/nav-vertical/flow.svg";
import { ReactComponent as LogOutIcon } from "../../../assets/svgs/nav-vertical/logOut.svg";
import { ReactComponent as LogoIcon } from "../../../assets/svgs/nav-vertical/logoImage.svg";
import { ReactComponent as StakingVestingIcon } from "../../../assets/svgs/nav-vertical/staking_v.svg";
import { ReactComponent as TradeIcon } from "../../../assets/svgs/nav-vertical/trade.svg";
import { ReactComponent as WalletIcon } from "../../../assets/svgs/nav-vertical/wallet.svg";
import { resetUser } from "../../../store/action";
import { useAppSelector } from "../../../store/reducers";
import { setLocalStorage } from "../../hooks";
import useStyles from "./style";

type Props = {
  notShowInfo?: boolean;
};

interface INavList {
  label: string;
  icon: React.ReactElement;
}

export default function NavVertical({ notShowInfo }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userState = useAppSelector((state) => state.authReducer);

  const navList: INavList[] = [
    {
      label: "Trade",
      icon: <TradeIcon />,
    },
    {
      label: "Community",
      icon: <CommunityIcon />,
    },
    {
      label: "Follow Trader",
      icon: <FollowTradeIcon />,
    },
    {
      label: "Wallet",
      icon: <WalletIcon />,
    },
    {
      label: "Staking & Rewards",
      icon: <StakingVestingIcon />,
    },
    {
      label: "Vesting",
      icon: <StakingVestingIcon />,
    },
  ];

  const handleLogout = async () => {
    await dispatch(resetUser());
    setLocalStorage("access_token", "");
    setLocalStorage("refresh_token", "");
    navigate("/sign-in");
  };

  return (
    <div
      className={location.pathname === "/" ? classes.boxCustom : classes.box}
    >
      <div
        className={
          location.pathname === "/"
            ? classes.containerCustom
            : classes.container
        }
      >
        <div className={classes.menu}>
          <div className={classes.menuItem}>
            <LogoIcon />
          </div>
          {navList.map((nav, index) => (
            <div className={classes.menuItem} key={index}>
              <>{nav.icon}</>
              <div>{nav.label}</div>
            </div>
          ))}
        </div>
        {userState.data.email && (
          <div className={classes.info}>
            {!notShowInfo && userState.data.email && (
              <>
                <div className={classes.menu}>
                  <div className={classes.menuItem}>
                    <img alt="" src="" className={classes.imgAvatar} />
                    <div>0x900...h21</div>
                  </div>
                </div>
                <div className={classes.menu}>
                  <div className={classes.menuItem}>
                    <div className={classes.circleAvatar}></div>
                    <div>No Wallet</div>
                  </div>
                </div>
              </>
            )}
            <div className={classes.menu} onClick={handleLogout}>
              <div className={classes.menuItem}>
                <LogOutIcon />
                <div>Log out</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
