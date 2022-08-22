import {
  Fade,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowDown, Logout } from "../../../../assets/svgs";
import useStyles from "./style";
type Props = {};

export default function UserConnect({}: Props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const userData = useSelector((s: any) => s.authAction.data);
  const navigate = useNavigate();
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget);
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
              localStorage.removeItem("access_token");
              navigate("/sign-in");
            }}
          />
        </MenuItem>
      </Menu>
    </div>
  );
}
