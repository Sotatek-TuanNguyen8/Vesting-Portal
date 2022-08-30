import { Button } from "@mui/material";
import moment from "moment";
import { useCallback, useEffect, useRef, useState } from "react";
import Administration from "..";
import AdminPanel from "../..";
import UpdateRoot from "../UpdateRoot";
import { UploadIcon } from "../../../../assets/svgs";
import {
  getDataTokenomics,
  uploadTokenomics,
} from "../../../../service/admin.service";
import AdminLayout from "../../../admin-auth/layoutAdmin/index";
import ListAccountTokenomics from "./ListAccountTokenomics";
import useStyles from "./style";
import PaginationCustom from "../Pagination/index";
import { IListTokenomic } from "../../../../utils/types/index";
import { scrollIntoView } from "../../../../utils/common/fn";
import { toast } from "react-toastify";

export default function Tokenomics() {
  const styles = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<Array<any>>([]);

  const [startTimeData, setStartTimeData] = useState<number | null>(null);
  const [count, setCount] = useState<number>(1);
  const [query, setQuery] = useState<IListTokenomic>({
    page_number: 0,
    page_size: 10,
  });
  const [csvValue, setCsvValue] = useState<any>("");
  const scrollIntoViewRef = useRef<any>(null);

  const handleAddNew = () => {
    setOpen(true);
  };

  const getDataTable = useCallback(async () => {
    const renderData = await getDataTokenomics(
      query,
      sessionStorage.getItem("access_token") as string
    );
    if (!renderData) return;
    setDataTable(renderData?.data.rounds);
    setStartTimeData(renderData?.data?.start_time);
    setCount(renderData?.meta?.count);
  }, [query]);

  useEffect(() => {
    getDataTable();
  }, [getDataTable]);

  const handleUpdateCsv = async (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log("file", file);
    const bytesToMegaBytes: any = file.size / 1024 ** 2;
    console.log("bytesToMegaBytes", bytesToMegaBytes);

    if (file.type === "text/csv") {
      if (bytesToMegaBytes < 100) {
        let formData = new FormData();
        formData.append("file", file);
        const data = await uploadTokenomics(formData);

        if (data?.data) {
          toast.success("Upload Successfully");
        } else {
          if (data?.error.statusCode === 400) {
            toast.error("File format is not supported");
          }
        }
      } else {
        toast.error("File size exceeded alllowed limits (100MB)");
      }
    } else {
      toast.error("File format is not supported");
    }
    setCsvValue("");
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
                    multiple
                    type="file"
                    onChange={handleUpdateCsv}
                    value={csvValue}
                  />
                </Button>
              </div>
              <div className={styles.updateRoot}>
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
            <div className={styles.body} ref={scrollIntoViewRef}>
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
            {count > 10 && (
              <PaginationCustom
                count={Math.ceil(count / query?.page_size)}
                onChange={(page) => {
                  setQuery({ ...query, page_number: page - 1 });
                  scrollIntoView(scrollIntoViewRef);
                }}
                page={query?.page_number + 1}
              />
            )}
          </div>
        </div>
      </AdminLayout>
    </div>
  );
}
