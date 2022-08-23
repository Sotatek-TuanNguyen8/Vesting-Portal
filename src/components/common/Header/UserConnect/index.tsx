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

export default function UserConnect() {
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
      <div className={classes.avatar}></div>
      <div onClick={handleClick} className={classes.dropMenu}>
        <div className="info">
          <p>{userData.fullName}</p>
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
        <MenuItem>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText
            primary="Log out"
            onClick={() => {
              handleLogout();
            }}
          />
        </MenuItem>
      </Menu>
    </div>
  );
}
