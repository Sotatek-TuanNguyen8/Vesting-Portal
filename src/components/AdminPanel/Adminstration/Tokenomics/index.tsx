import React, { useCallback, useEffect, useState } from "react";
import Administration from "..";
import AdminPanel from "../..";
import ListAccountTokenomics from "./ListAccountTokenomics";
import useStyles from "./style";
import AdminLayout from "../../../admin-auth/layoutAdmin/index";
import { UploadIcon, UploadRootIcon } from "../../../../assets/svgs";
import { Button } from "@mui/material";
import { getDataTokenomics } from "../../../../service";

type Props = {};

export default function Tokenomics({}: Props) {
  const styles = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<Array<any>>([]);
  const handleAddNew = () => {
    setOpen(true);
  };

  const getDataTable = useCallback(async () => {
    const renderData = await getDataTokenomics();
    if (!renderData) return;
    setDataTable(renderData?.data);
  }, []);
  useEffect(() => {
    getDataTable();
  }, [getDataTable]);
  return (
    <div>
      <AdminLayout>
        <AdminPanel />
        <div className={styles.container}>
          <Administration active={"tokenomics"} />
          <div className="listInvestor">
            <div className={styles.featureWrap}>
              <div className="d-flex">
                <div className="new" onClick={handleAddNew}>
                  <img src="/images/iconAdd.svg" alt="" />
                  <p>New</p>
                </div>
                <div className={styles.featureUPload}>
                  <UploadIcon />
                  <p>Upload</p>
                </div>
              </div>
              <div>
                <Button
                  variant="contained"
                  sx={{
                    background: "#BBBBBB",
                    marginRight: "45px",
                    fontSize: "400",
                    fontWeight: "18px",
                    color: "#E9E9F0",
                    textTransform: "initial",
                  }}
                >
                  <UploadRootIcon style={{ marginRight: "3px" }} />
                  Update Root
                </Button>
              </div>
            </div>
            <div className={styles.body}>
              <p className={styles.startTime}>Start date: Feb 24, 2022</p>
              <ListAccountTokenomics
                openAdd={open}
                setAdd={setOpen}
                dataTable={dataTable}
                setDataTable={setDataTable}
                renderTable={getDataTable}
              />
            </div>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
}
