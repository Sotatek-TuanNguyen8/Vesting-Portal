import { Drawer, List, ListItem } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { AvatarDefault, Close } from "../../../../assets/svgs";
import { convertTextAddressWallet } from "../../../../utils/common/fn";
import useStyles from "./style";
type Props = {
  open: boolean;
  handleClose: () => void;
};

interface IListItem {
  label: string;
  href: string;
}

export default function NavMobile({ open, handleClose }: Props) {
  const location = useLocation();
  const { pathname } = location;
  const classes = useStyles();
  const userData = useSelector((s: any) => s.authAction.data);

  const listMenu: IListItem[] = [
    { label: "STAKING/LP", href: "/1" },
    { label: "CLAIMING", href: "/" },
    { label: "ADD LIQUIDITY", href: "/2" },
    { label: "LEND", href: "/3" },
  ];

  const isActive = (href: string) => {
    return pathname === href && classes.active;
  };

  return (
    <div>
      <Drawer
        open={open}
        onClose={handleClose}
        anchor="right"
        className={classes.drawer}
      >
        <div className={classes.iconClose} onClick={handleClose}>
          <Close />
        </div>
        <div className={classes.info}>
          <AvatarDefault style={{ marginRight: 30 }} />
          <div className="boxInfo">
            {userData?.fullName && <p>{userData?.fullName}</p>}
            {userData?.metamaskAddress && (
              <span>
                {convertTextAddressWallet(4, 4, userData?.metamaskAddress)}
              </span>
            )}
          </div>
        </div>
        <List>
          {listMenu.map((el, index) => (
            <ListItem button key={index} className={clsx(isActive(el.href))}>
              <ListItemText primary={el.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
