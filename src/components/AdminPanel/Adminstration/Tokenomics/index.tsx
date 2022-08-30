import { Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Administration from "..";
import AdminPanel from "../..";
import ClaimABI from "../../../../abi/User-Claim.json";
import { UploadIcon, UploadRootIcon } from "../../../../assets/svgs";
import {
  getDataTokenomics,
  uploadTokenomics,
} from "../../../../service/admin.service";
import { getContractConnect } from "../../../../service/web";
import useMetaMask from "../../../../utils/hooks/useMetaMask";
import AdminLayout from "../../../admin-auth/layoutAdmin/index";
import { TRANSACTION_TIMEOUT } from "../../../web3/connector";
import ListAccountTokenomics from "./ListAccountTokenomics";
import useStyles from "./style";
import PaginationCustom from "../Pagination/index";
import { IListTokenomic } from "../../../../utils/types/index";

type Props = {};

export default function Tokenomics({}: Props) {
  const styles = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<Array<any>>([]);
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const [checkClickFirst, setCheckClickFirst] = useState<boolean>(false);
  const [startTimeData, setStartTimeData] = useState<string>("");
  const { account, wrongNetWork, switchNetwork } = useMetaMask();
  const [count, setCount] = useState<number>(1);
  const [query, setQuery] = useState<IListTokenomic>({
    page_number: 0,
    page_size: 10,
  });
  const [csvValue, setCsvValue] = useState<any>("");

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
    setCount(renderData?.meta?.count);
  }, [query]);

  useEffect(() => {
    getDataTable();
  }, [getDataTable]);

  const handleUpdate = async (
    abi: any,
    contractAddress: string
  ): Promise<{ time_out_update: boolean }> => {
    return new Promise(async (resolve, reject) => {
      let timeOut;
      const contract = await getContractConnect(abi, contractAddress);
      setLoadingTransaction(true);
      try {
        await contract?.methods
          .updateRoot(12)
          .send({
            from: account,
          })
          .on("transactionHash", () => {
            timeOut = setTimeout(() => {
              resolve({
                time_out_update: true,
              });
            }, TRANSACTION_TIMEOUT);
          });
      } catch (error: any) {
        reject(error);
      }
      clearTimeout(timeOut);
      resolve({
        time_out_update: false,
      });
      setLoadingTransaction(false);
    });
  };

  const handleUpdateRoot = async () => {
    console.log(wrongNetWork);
    setCheckClickFirst(true);
    if (wrongNetWork) {
      const switchError = await switchNetwork();
      if (!switchError) {
        try {
          const { time_out_update } = await handleUpdate(
            ClaimABI,
            process.env.REACT_APP_CONTRACT_PROXY as string
          );
          if (!time_out_update) {
            toast.success("Successful transaction done");
          } else {
            toast.error(
              "Transaction Pending. Please wait for transaction success and reload page"
            );
          }
        } catch (error) {
          toast.warning("You denied the transaction");
        }
      }
    }
    setCheckClickFirst(false);
  };

  const handleUpdateCsv = async (e: any) => {
    debugger;
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
          debugger;
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
                  onClick={handleUpdateRoot}
                >
                  <UploadRootIcon style={{ marginRight: "3px" }} />
                  Update Root
                </Button>
              </div>
            </div>
            <div className={styles.body}>
              {startTimeData && (
                <p className={styles.startTime}>Start date: Feb 24, 2022</p>
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
                onChange={(page) =>
                  setQuery({ ...query, page_number: page - 1 })
                }
                page={query?.page_number + 1}
              />
            )}
          </div>
        </div>
      </AdminLayout>
    </div>
  );
}
