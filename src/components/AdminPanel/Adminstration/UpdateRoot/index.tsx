import { Button } from "@mui/material";
import { useState } from "react";
import { UploadRootIcon } from "../../../../assets/svgs";
import ModalConfirmUpdateRoot from "./ModalConfirmUpdateRoot";

export default function UpdateRoot(props: any) {
  const { checkRootData } = props;
  const [disableGenerate, setDisableGenerate] = useState(false);
  const [open, setOpen] = useState<boolean>(false);

  const checkValueData = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={checkValueData}
        variant="contained"
        sx={{
          background: "#3FBCE9",
          marginRight: "60px",
          fontSize: "400",
          fontWeight: "18px",
          color: "#E9E9F0",
          textTransform: "initial",

          // "&:hover": {
          //   color: "#051C42",
          //   backgroundColor: "#3FBCE9",
          //   transition: " all 0.8s ease",

          //   "& svg g path": {
          //     fill: "#051C42",
          //     transition: " all 0.8s ease",
          //   },
          // },
        }}
        disabled={disableGenerate}
      >
        <UploadRootIcon style={{ marginRight: "3px" }} />
        Update Root
      </Button>
      <ModalConfirmUpdateRoot
        checkRootData={checkRootData}
        open={open}
        onClose={handleCloseModal}
        setDisableGenerate={setDisableGenerate}
      />
    </>
  );
}
