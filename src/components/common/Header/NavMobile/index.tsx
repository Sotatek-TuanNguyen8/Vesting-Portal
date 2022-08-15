import { Drawer, List, ListItem, ListItemIcon } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import clsx from "clsx";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";
type Props = {
  open: boolean;
  handleClose: () => void;
};

interface ListItem {
  label: string;
  href: string;
}

export default function NavMobile({ open, handleClose }: Props) {
  const router = useRouter();
  const { pathname } = router;

  const listMenu: ListItem[] = [
    { label: "STAKING/LP", href: "" },
    { label: "CLAIMING", href: "" },
    { label: "ADD LIQUIDITY", href: "" },
    { label: "LEND", href: "" },
  ];

  const isActive = (href: string) => {
    return pathname === href && styles.active;
  };

  return (
    <div>
      <Drawer
        open={open}
        onClose={handleClose}
        anchor="right"
        className={styles.drawer}
      >
        <div className={styles.iconClose} onClick={handleClose}>
          <img src="/images/icons/close.svg" />
        </div>
        <div className={styles.info}>
          <img className={styles.avatar} />
          <div className={styles.boxInfo}>
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
