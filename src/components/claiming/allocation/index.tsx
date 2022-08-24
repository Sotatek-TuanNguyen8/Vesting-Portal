import { Button, Divider, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getContractConnect } from "../../../service/web";
import { useDispatch, useSelector } from "react-redux";
import ClaimABI from "../../../abi/User-Claim.json";
import { AppDispatch } from "../../../store";
import { fetchInfoClaim } from "../../../store/action/claim.action";
import useMetaMask from "../../../utils/hooks/useMetaMask";
import { TRANSACTION_TIMEOUT } from "../../web3/connector";
import LineChart from "../line-chart";
import useStyles from "./style";
import moment from "moment";

type Props = {};
const data = [
  {
    name: "18",
    value: 123,
  },
  {
    name: "19",
    value: 234,
  },
  {
    name: "20",
    value: 206,
  },
  {
    name: "21",
    value: 228,
  },
  {
    name: "22",
    value: 804,
  },
  {
    name: "23",
    value: 500,
  },
  {
    name: "24",
    value: 700,
  },
];
export default function Allocation({}: Props) {
  const classes = useStyles();
  const { switchNetwork, wrongNetWork, account } = useMetaMask();
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const [checkClickFirst, setCheckClickFirst] = useState<boolean>(false);
  const infoClaim = useSelector((s: any) => s.claimAction.data);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!account) return;
    dispatch(fetchInfoClaim("1"));
  }, []);

  const handleClaim = async (
    abi: any,
    contractAddress: string
  ): Promise<{ time_out_claim: boolean }> => {
    return new Promise(async (resolve, reject) => {
      let timeOut;
      const contract = await getContractConnect(abi, contractAddress);
      setLoadingTransaction(true);
      try {
        await contract?.methods
          .claimToken(12, 100, 10, 17823678, 123, 123, ["auidyuasdy"])
          .send({
            from: account,
          })
          .on("transactionHash", () => {
            timeOut = setTimeout(() => {
              resolve({
                time_out_claim: true,
              });
            }, TRANSACTION_TIMEOUT);
          });
      } catch (error: any) {
        reject(error);
      }
      clearTimeout(timeOut);
      resolve({
        time_out_claim: false,
      });
      setLoadingTransaction(false);
    });
  };

  const handleClaimToken = async () => {
    setCheckClickFirst(true);
    if (wrongNetWork) {
      await switchNetwork();
    }
    try {
      const { time_out_claim } = await handleClaim(
        ClaimABI,
        process.env.REACT_APP_CONTRACT_PROXY as string
      );
      if (!time_out_claim) {
        toast.success("Claim Successfully");
        dispatch(fetchInfoClaim("1"));
      } else {
        toast.error(
          "Transaction Pending. Please wait for transaction success and reload page"
        );
      }
    } catch (error) {
      toast.error("Claim Failed");
      console.error(error);
    }
    setCheckClickFirst(false);
  };

  return (
    <div className={classes.seed}>
      <Typography variant="h5">SEED</Typography>
      <p className={classes.text}>View Instructions</p>
      <div className={classes.container}>
        <div className={classes.info}>
          <div className={classes.tokenType}>
            <div className="label">Vesting Type</div>
            <div className="content">Pre-Seed</div>
          </div>
          <div className={classes.tokenType}>
            <div className="label">Total Amount</div>
            <div className="content">500,000 FLD</div>
          </div>
          <div className={classes.tokenType}>
            <div className="label">Next Unlock In</div>
            <div className="content">17 Days</div>
          </div>
          <div className={classes.tokenType}>
            <div className="label">Tokens Vested</div>
            <div className="content">0 FLD</div>
          </div>
          <div className={classes.tokenType}>
            <div className="label">Tokens Pending</div>
            <div className="content">500,000 FLD</div>
          </div>
          <div className={classes.tokenType}>
            <div className="label">Tokens Claimed</div>
            <div className="content">400 FLD</div>
          </div>

          <div className={classes.tokenType}>
            <div className="label">Available to Claim</div>
            <div className="content">406 FLD</div>
          </div>

          <div style={{ width: "100%", height: 62, marginTop: 20 }}>
            <Button
              disabled={checkClickFirst}
              onClick={() => handleClaimToken()}
            >
              CLAIM
            </Button>
          </div>
        </div>
        <div className={classes.lineChart}>
          <LineChart data={data} width={700} height={500} />
        </div>
      </div>
    </div>
  );
}
