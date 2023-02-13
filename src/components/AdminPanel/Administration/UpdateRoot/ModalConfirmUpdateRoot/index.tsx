import { Dialog } from "@material-ui/core";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ClaimABI from "../../../../../abi/User-Claim.json";
import {
  postGenerageData,
  updateRoot,
} from "../../../../../service/admin.service";
import { getContractConnect } from "../../../../../service/web";
import useMetaMask from "../../../../../utils/hooks/useMetaMask";
import Loading from "../../../../common/Loading";
import { TRANSACTION_TIMEOUT } from "../../../../web3/connector";
import useStyles from "./style";

type Props = {
  open: boolean;
  onClose: () => void;
  checkRootData: any;
  setDisableGenerate: any;
  fetchListInvestors: () => void;
};

export default function ModalConfirmUpdateRoot({
  open,
  onClose,
  checkRootData,
  setDisableGenerate,
  fetchListInvestors,
}: Props) {
  //   const { checkRootData, open, onClose } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [checkClickFirst, setCheckClickFirst] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    });
  };

  const handleUpdateRoot = async (valueRoot: string) => {
    setIsConfirm(true);
    setCheckClickFirst(true);
    setDisableGenerate(true);
    setIsLoading(true);
    onClose();
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
          await fetchListInvestors();
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
    setIsLoading(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkRootData]);

  const handleClickCancel = () => {
    onClose();
  };

  return (
    <>
      <Loading open={isLoading} />

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
    </>
  );
}
