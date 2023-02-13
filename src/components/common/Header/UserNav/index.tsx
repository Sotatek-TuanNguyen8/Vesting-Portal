import {
  Fade,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowDown, AvatarDefault, Logout } from "../../../../assets/svgs";
import { RULE } from "../../../../classes/authen";
import { resetUser } from "../../../../store/action";
import { useAppSelector } from "../../../../store/reducers";
import { convertTextAddressWallet } from "../../../../utils/common/fn";
import { setLocalStorage } from "../../../hooks";
import useStyles from "./style";

export default function UserNav() {
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
      <AvatarDefault />
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
        {userData.role === RULE.admin && (
          <MenuItem>
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText
              primary="Admin Panel"
              onClick={() => {
                navigate("/admin-panel/investor");
              }}
            />
          </MenuItem>
        )}
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
