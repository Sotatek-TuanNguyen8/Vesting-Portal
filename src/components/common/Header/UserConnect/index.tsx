import {
  Fade,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowDown, AvatarDefault, Logout } from "../../../../assets/svgs";
import { resetUser } from "../../../../store/action";
import { setLocalStorage } from "../../../hooks";
import useStyles from "./style";
import { useAppSelector } from "../../../../store/reducers";

export default function UserConnect() {
  const [anchorEl, setAnchorEl] = useState(null);
  const userData = useAppSelector((s) => s.authReducer.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleLogout = async () => {
    await dispatch(resetUser());
    setLocalStorage("access_token", "");
    setLocalStorage("refresh_token", "");
    navigate("/sign-in");
  };

  return (
    <div className={classes.container}>
      <AvatarDefault style={{ marginRight: 30 }} />
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
