import {
  Button,
  Fade,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useState } from "react";
import styles from "./styles.module.scss";

type Props = {};

export default function UserNav({}: Props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <div className={styles.container}>
      <img className={styles.avatar} />
      <div onClick={handleClick} className={styles.dropMenu}>
        <div className={styles.info}>
          <p>Matias</p>
          <span>FWRF134...526</span>
        </div>
        <img
          className={styles.iconArrow}
          src="/images/icons/arrow_down.svg"
          alt=""
        />
      </div>
      <Menu
        id="customized-menu"
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        TransitionComponent={Fade}
        anchorEl={anchorEl}
        className={styles.menu}
      >
        <MenuItem>
          <ListItemIcon>
            <img src="images/icons/profile.svg" alt="profile" />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <img src="images/icons/setting.svg" alt="setting" />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <img src="images/icons/disconnect.svg" alt="disconnect" />
          </ListItemIcon>
          <ListItemText primary="Disconnect wallet" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <img src="images/icons/log_out.svg" alt="log_out" />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </MenuItem>
      </Menu>
    </div>
  );
}
