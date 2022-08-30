import { Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { UploadRootIcon } from "../../../../assets/svgs";
import { getContractConnect } from "../../../../service/web";
import useMetaMask from "../../../../utils/hooks/useMetaMask";
import { TRANSACTION_TIMEOUT } from "../../../web3/connector";
import ClaimABI from "../../../../abi/User-Claim.json";
import { toast } from "react-toastify";
import {
  postGenerageData,
  updateRoot,
} from "../../../../service/admin.service";
import { Box } from "@material-ui/core";

export default function UpdateRoot(props: any) {
  const { checkRootData } = props;
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const [checkClickFirst, setCheckClickFirst] = useState<boolean>(false);
  const [disableGenerate, setDisableGenerate] = useState(true);
  const { account, wrongNetWork, switchNetwork } = useMetaMask();

  const handleUpdate = async (
    abi: any,
    contractAddress: string,
    value: string,
  ): Promise<{ time_out_update: boolean }> => {
    return new Promise(async (resolve, reject) => {
      let timeOut;
      const contract = await getContractConnect(abi, contractAddress);
      setLoadingTransaction(true);
      try {
        await contract?.methods
          .updateRoot(`0x${value}`)
          .send({
            from: account,
          })
          .on("transactionHash", (hash: any) => {
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

  const handleUpdateRoot = async (valueRoot: string) => {
    setCheckClickFirst(true);
    let checkNetwork = wrongNetWork;
    if (wrongNetWork) {
      const switchError = await switchNetwork();
      checkNetwork = switchError;
    }
    // const dataRoot = await getDataRoot();
    if (!checkNetwork && valueRoot) {
      try {
        const { time_out_update } = await handleUpdate(
          ClaimABI,
          process.env.REACT_APP_CONTRACT_PROXY as string,
          valueRoot,
        );

        if (!time_out_update) {
          setDisableGenerate(false);
          toast.success("Successful transaction done");
          await updateRootApi();
        } else {
          toast.error(
            "Transaction Pending. Please wait for transaction success and reload page",
          );
        }
      } catch (error) {
        toast.warning("You denied the transaction");
      }
    }
    setCheckClickFirst(false);
  };
  const updateRootApi = async () => {
    const res = await updateRoot();
    if (!res || res?.error) return;
    return res;
  };
  useEffect(() => {
    if (checkRootData?.data?.value && !checkRootData?.data?.is_updated) {
      setDisableGenerate(false);
    } else {
      setDisableGenerate(true);
    }
  }, [checkRootData]);

  const generateRootData = async () => {
    const res = await postGenerageData();
    if (res?.data?.value && !res?.data?.is_updated)
      await handleUpdateRoot(res?.data?.value);
  };

  return (
    <Button
      onClick={generateRootData}
      variant="contained"
      sx={{
        background: "#BBBBBB",
        marginRight: "60px",
        fontSize: "400",
        fontWeight: "18px",
        color: "#E9E9F0",
        textTransform: "initial",
      }}
      disabled={disableGenerate}
    >
      <UploadRootIcon style={{ marginRight: "3px" }} />
      Update Root
    </Button>
  );
}
