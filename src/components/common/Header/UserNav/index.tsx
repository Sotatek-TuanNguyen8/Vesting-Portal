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
import { ArrowDown, Profile, Setting, Disconnect, Logout } from "@/svgs";
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
      {/* <img className={styles.avatar} /> */}
      <div onClick={handleClick} className={styles.dropMenu}>
        <div className={styles.info}>
          <p>Matias</p>
          <span>FWRF134...526</span>
        </div>
        <ArrowDown />
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
            <Profile />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Setting />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Disconnect />
          </ListItemIcon>
          <ListItemText primary="Disconnect wallet" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </MenuItem>
      </Menu>
    </div>
  );
}
