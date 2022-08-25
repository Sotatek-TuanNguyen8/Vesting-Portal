import {
  Fade,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowDown,
  AvatarDefault,
  Disconnect,
  Logout,
} from "../../../../assets/svgs";
import { setUser } from "../../../../store/action";
import { convertTextAddressWallet } from "../../../../utils/common/fn";
import { setLocalStorage } from "../../../hooks";
import useStyles from "./style";

export default function UserNav() {
  const [anchorEl, setAnchorEl] = useState(null);
  const userData = useSelector((s: any) => s.authAction.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
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
      <AvatarDefault style={{ marginRight: 30 }} />
      <div onClick={handleClick} className={classes.dropMenu}>
        <div className="info">
          {userData?.fullName && <p>{userData?.fullName}</p>}
          {userData?.metamaskAddress && (
            <span>
              {convertTextAddressWallet(4, 4, userData?.metamaskAddress)}
            </span>
          )}
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
              navigate("/sign-in");
            }}
          />
        </MenuItem>
      </Menu>
    </div>
  );
}
