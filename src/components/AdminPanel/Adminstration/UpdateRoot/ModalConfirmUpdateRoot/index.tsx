import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { UploadRootIcon } from "../../../../../assets/svgs";
import { getContractConnect } from "../../../../../service/web";
import useMetaMask from "../../../../../utils/hooks/useMetaMask";
import { TRANSACTION_TIMEOUT } from "../../../../web3/connector";
import ClaimABI from "../../../../../abi/User-Claim.json";
import { toast } from "react-toastify";
import {
  postGenerageData,
  updateRoot,
} from "../../../../../service/admin.service";
import useStyles from "./style";
import { Dialog } from "@material-ui/core";

type Props = {
  open: boolean;
  onClose: () => void;
  checkRootData: any;
  setDisableGenerate: any;
};

export default function ModalConfirmUpdateRoot({
  open,
  onClose,
  checkRootData,
  setDisableGenerate,
}: Props) {
  //   const { checkRootData, open, onClose } = props;
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const [checkClickFirst, setCheckClickFirst] = useState<boolean>(false);
  //   const [disableGenerate, setDisableGenerate] = useState(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const { account, wrongNetWork, switchNetwork } = useMetaMask();
  const styles = useStyles();

  const handleUpdate = async (
    abi: any,
    contractAddress: string,
    value: string
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
    setIsConfirm(true);
    setCheckClickFirst(true);
    setDisableGenerate(true);
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
          valueRoot
        );

        if (!time_out_update) {
          toast.success("Successful transaction done");
          await updateRootApi();
        } else {
          toast.error(
            "Transaction Pending. Please wait for transaction success and reload page"
          );
        }
      } catch (error) {
        toast.warning("You denied the transaction");
        setDisableGenerate(false);
      }
    }
    setCheckClickFirst(false);
    onClose();
  };
  const updateRootApi = async () => {
    const res = await updateRoot();
    if (!res || res?.error) return;
    return res;
  };
  const handleConfirm = async () => {
    if (!checkRootData?.value && !checkRootData?.is_updated) {
      await generateRootData();
    } else if (checkRootData?.value && !checkRootData?.is_updated) {
      await handleUpdateRoot(checkRootData?.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const generateRootData = async () => {
    const res = await postGenerageData();
    if (res?.data?.value && !res?.data?.is_updated)
      await handleUpdateRoot(res?.data?.value);
  };
  useEffect(() => {
    if (checkRootData?.is_updated) {
      setDisableGenerate(true);
    } else {
      setDisableGenerate(false);
    }
  }, [checkRootData]);

  const handleClickCancel = () => {
    onClose();
  };

  return (
    <Dialog
      className={styles.container}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <div className={styles.content}>
        <p>Are you sure you want to update root?</p>
      </div>
      <div className={styles.textContent}>
        <button onClick={handleClickCancel} className={styles.btnCancel}>
          Cancel
        </button>

        <button onClick={handleConfirm} className={styles.btnConfirm}>
          Confirm
        </button>
      </div>
    </Dialog>
  );
}
