import { Button } from "@mui/material";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import Administration from "..";
import AdminPanel from "../..";
import UpdateRoot from "../UpdateRoot";
import { UploadIcon } from "../../../../assets/svgs";
import { getDataTokenomics } from "../../../../service/admin.service";
import AdminLayout from "../../../admin-auth/layoutAdmin/index";
import ListAccountTokenomics from "./ListAccountTokenomics";
import useStyles from "./style";

export default function Tokenomics() {
  const styles = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<Array<any>>([]);

  const [startTimeData, setStartTimeData] = useState<number | null>(null);

  const handleAddNew = () => {
    setOpen(true);
  };

  const getDataTable = useCallback(async () => {
    const renderData = await getDataTokenomics();
    if (!renderData) return;
    setDataTable(renderData?.data?.rounds);
    setStartTimeData(renderData?.data?.start_time);
  }, []);

  useEffect(() => {
    getDataTable();
  }, [getDataTable]);

  const handleUpdateCsv = (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    const fileReader = new FileReader();
    if (file) {
      fileReader.onload = (e: any) => {
        const csvOutput = e.target.result;
      };
      fileReader.readAsText(file);
    }
  };

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
                <Button
                  className={styles.featureUPload}
                  variant="outlined"
                  component="label"
                  sx={{
                    border: "none",
                    alignItems: "center",
                    marginLeft: "90px",
                    padding: "0",
                    fontFamily: "gibson",
                    "& p": {
                      fontWeight: 400,
                      fontSize: "18px",
                      color: "#051C42",
                      margin: "0 0 0 5px",
                      textTransform: "initial",
                    },
                    "&:hover": {
                      backgroundColor: "transparent",
                      border: "none",
                    },
                  }}
                >
                  <UploadIcon />
                  <p>Upload</p>
                  <input
                    hidden
                    accept="'.csv"
                    multiple
                    type="file"
                    onChange={handleUpdateCsv}
                  />
                </Button>
              </div>
              <div>
                <UpdateRoot
                  variant="contained"
                  sx={{
                    background: "#BBBBBB",
                    marginRight: "45px",
                    fontSize: "400",
                    fontWeight: "18px",
                    color: "#E9E9F0",
                    textTransform: "initial",
                  }}
                />
              </div>
            </div>
            <div className={styles.body}>
              {startTimeData && (
                <p className={styles.startTime}>
                  Start date:{" "}
                  {moment.unix(startTimeData).format("MMM DD,YYYY HH:mm:ss")}
                </p>
              )}

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
