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
import { ArrowDown, Logout } from "../../../../assets/svgs";
import { resetUser } from "../../../../store/action";
import { useAppSelector } from "../../../../store/reducers";
import { convertTextAddressWallet } from "../../../../utils/common/fn";
import useMetaMask from "../../../../utils/hooks/useMetaMask";
import useStyles from "./style";

export default function UserNavAdmin() {
  const [anchorEl, setAnchorEl] = useState(null);
  const userData = useAppSelector((s) => s.authReducer.data);
  const navigate = useNavigate();
  const classes = useStyles();
  const { account } = useMetaMask();
  const dispatch = useDispatch();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/admin-panel");
  };

  return (
    <div className={classes.container}>
      <div onClick={handleClick} className={classes.dropMenu}>
        <div className="info">
          <img src="/images/avatar.svg" alt="" />
          <p>{convertTextAddressWallet(4, 4, account)}</p>
          {userData && userData?.metamaskAddress && <span>FWRF134...526</span>}
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
            onClick={async () => {
              localStorage.removeItem("access_token");
              await dispatch(resetUser());
            }}
          />
        </MenuItem>
      </Menu>
    </div>
  );
}
