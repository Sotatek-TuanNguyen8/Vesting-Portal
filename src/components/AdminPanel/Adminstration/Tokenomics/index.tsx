import { Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Administration from "..";
import AdminPanel from "../..";
import ClaimABI from "../../../../abi/User-Claim.json";
import { UploadIcon, UploadRootIcon } from "../../../../assets/svgs";
import { getDataTokenomics } from "../../../../service/admin.service";
import { getContractConnect } from "../../../../service/web";
import useMetaMask from "../../../../utils/hooks/useMetaMask";
import AdminLayout from "../../../admin-auth/layoutAdmin/index";
import { TRANSACTION_TIMEOUT } from "../../../web3/connector";
import ListAccountTokenomics from "./ListAccountTokenomics";
import useStyles from "./style";

type Props = {};

export default function Tokenomics({}: Props) {
  const styles = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<Array<any>>([]);
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const [checkClickFirst, setCheckClickFirst] = useState<boolean>(false);
  const { account, wrongNetWork, switchNetwork } = useMetaMask();

  const handleAddNew = () => {
    setOpen(true);
  };

  const getDataTable = useCallback(async () => {
    const renderData = await getDataTokenomics();
    console.log(renderData);
    if (!renderData) return;
    setDataTable(renderData?.data);
  }, []);

  useEffect(() => {
    getDataTable();
  }, [getDataTable]);

  const handleUpdate = async (
    abi: any,
    contractAddress: string,
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
    setCheckClickFirst(true);
    if (wrongNetWork) {
      const switchError = await switchNetwork();
      if (!switchError) {
        try {
          const { time_out_update } = await handleUpdate(
            ClaimABI,
            process.env.REACT_APP_CONTRACT_PROXY as string,
          );
          if (!time_out_update) {
            toast.success("Successful transaction done");
          } else {
            toast.error(
              "Transaction Pending. Please wait for transaction success and reload page",
            );
          }
        } catch (error) {
          toast.warning("You denied the transaction");
        }
      }
    }
    setCheckClickFirst(false);
  };
  const handleUpdateCsv = (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    const fileReader = new FileReader();
    if (file) {
      fileReader.onload = (e: any) => {
        const csvOutput = e.target.result;
        console.log(e);
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
