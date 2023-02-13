import { ReactComponent as ArrowDownIcon } from "../../../../assets/svgs/arrow_down.svg";
import { ReactComponent as EarthIcon } from "../../../../assets/svgs/earth.svg";
import { ReactComponent as DarkIcon } from "../../../../assets/svgs/dark.svg";
import useStyles from "./style";
import { Link } from "react-router-dom";
import { Box, useMediaQuery } from "@material-ui/core";
import { Modal } from "@mui/material";
import { useState } from "react";
import { styleModal } from "../../../GoogleAuthentication/BackupKey/style";
import ModalSetting from "./ModalSetting";
import { useAppSelector } from "../../../../store/reducers";

export default function NavbarAction() {
  const isLaptop = useMediaQuery("(max-width: 1700px)");
  const userState = useAppSelector((state) => state.authReducer);
  const [openModalSetting, setOpenModalSetting] = useState<boolean>(false);
  const classes = useStyles();

  const handleToggleModalSetting = (payload: boolean) => {
    setOpenModalSetting(payload);
  };

  return (
    <>
      {isLaptop ? (
        <>
          <button
            className={classes.btnSetting}
            onClick={() => handleToggleModalSetting(true)}
          >
            Setting
          </button>
          <Modal
            open={openModalSetting}
            onClose={() => handleToggleModalSetting(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styleModal}>
              <ModalSetting />
            </Box>
          </Modal>
        </>
      ) : (
        <div className={classes.navbarAction}>
          {!userState.data.email && (
            <>
              <button className={classes.btnLogin}>
                <Link to="/sign-in">LOGIN</Link>
              </button>
              <button className={classes.btnRegister}>
                <Link to="/sign-up">REGISTER</Link>
              </button>
            </>
          )}
          <EarthIcon />
          <div className={classes.navLang}>
            <span>ENG</span>
            <ArrowDownIcon />
          </div>
          <DarkIcon />
        </div>
      )}
    </>
  );
}
