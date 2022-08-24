import {
  Fade,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowDown, Logout } from "../../../../assets/svgs";
import { setUser } from "../../../../store/action";
import { setLocalStorage } from "../../../hooks";
import useStyles from "./style";
type Props = {};

export default function UserNavAdmin({}: Props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const userData = useSelector((s: any) => s.authAction.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleLogout = () => {
    dispatch(setUser({}));
    setLocalStorage("access_token", "");
    setLocalStorage("refresh_token", "");
    navigate("/sign-in");
  };

  return (
    <div className={classes.container}>
      {/* <img className={styles.avatar} /> */}
      <div onClick={handleClick} className={classes.dropMenu}>
        <div className="info">
          <img src="/images/avatar.svg" alt="" />
          <p>Matias</p>
          {userData && userData?.metamaskAdress && <span>FWRF134...526</span>}
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
        className={classes.menu}
      >
        <MenuItem
          onClick={() => {
            handleLogout();
          }}
        >
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText
            primary="Log out"
            onClick={() => {
              localStorage.removeItem("access_token");
            }}
          />
        </MenuItem>
      </Menu>
    </div>
  );
}
