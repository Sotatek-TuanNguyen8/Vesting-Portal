import { Drawer, List, ListItem } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
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

  const listMenu: IListItem[] = [
    { label: "STAKING/LP", href: "" },
    { label: "CLAIMING", href: "" },
    { label: "ADD LIQUIDITY", href: "" },
    { label: "LEND", href: "" },
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
          <img src="/images/icons/close.svg" alt="icon_close" />
        </div>
        <div className={classes.info}>
          <div className="avatar"></div>
          <div className="boxInfo">
            <p>Matias</p>
            <span>FWRF134...526</span>
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
