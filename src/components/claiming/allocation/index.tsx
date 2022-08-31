import { Button, Typography } from "@material-ui/core";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ClaimABI from "../../../abi/User-Claim.json";
import { getInfoClaim } from "../../../service/claim.service";
import { getContractConnect } from "../../../service/web";
import { format_thousands_decimal } from "../../../utils/common/fn";
import useMetaMask from "../../../utils/hooks/useMetaMask";
import { TRANSACTION_TIMEOUT } from "../../web3/connector";
import LineChart from "../line-chart";
import useStyles from "./style";

type Props = {
  dataClaim: IDataClaim;
  key: number;
  fetchListJoinClaim: () => void;
};
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
    value: 104,
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

export interface IDataClaim {
  claimed: string;
  id: number;
  stage_name: string;
  total_amount: string;
  vesting_type: string;
  vesting_type_id: number;
}

export interface IClaim {
  allocation_token: string;
  cliff_duration: any;
  proof: string[];
  start_time: string;
  tge: number;
  vesting_duration: any;
}

export default function Allocation({ dataClaim, fetchListJoinClaim }: Props) {
  const classes = useStyles();
  const { switchNetwork, wrongNetWork, account } = useMetaMask();
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const [availableClaim, setAvailableClaim] = useState<number>(0);
  const infoClaimData = useSelector((s: any) => s.claimAction.data);
  const infoClaimError = useSelector((s: any) => s.claimAction.error);

  const getAvailableClaim = useCallback(async () => {
    if (!account || !dataClaim?.vesting_type_id) return;
    const contract = await getContractConnect(
      ClaimABI,
      process.env.REACT_APP_CONTRACT_PROXY as string
    );
    const res = await contract?.methods
      .claimableToken(account, dataClaim.vesting_type_id)
      .call();
    setAvailableClaim(Number(res[0]));
  }, [account, dataClaim.vesting_type_id]);

  useEffect(() => {
    getAvailableClaim();
  }, [getAvailableClaim]);

  const handleClaim = async (
    abi: any,
    contractAddress: string
  ): Promise<{ time_out_claim: boolean }> => {
    return new Promise(async (resolve, reject) => {
      let timeOut;
      const res = await getInfoClaim(dataClaim.id);
      if (res?.data) {
        const {
          allocation_token,
          cliff_duration,
          proof,
          tge,
          vesting_duration,
          start_time,
          vesting_type,
        } = res.data;
        const contract = await getContractConnect(abi, contractAddress);
        try {
          await contract?.methods
            .claimToken(
              vesting_type,
              allocation_token,
              tge,
              start_time,
              cliff_duration,
              vesting_duration,
              proof
            )
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
      } else {
      }
    });
  };

  const handleClaimToken = async () => {
    setLoadingTransaction(true);
    if (wrongNetWork) {
      await switchNetwork();
    }
    try {
      const { time_out_claim } = await handleClaim(
        ClaimABI,
        process.env.REACT_APP_CONTRACT_PROXY as string
      );
      if (!time_out_claim) {
        toast.success("Successful transaction done");
        fetchListJoinClaim();
      } else {
        toast.error(
          "Transaction Pending. Please wait for transaction success and reload page"
        );
      }
    } catch (error: any) {
      if (error?.code === 4001) {
        toast.warning("You denied the transaction");
      } else {
        toast.error("Transaction failed");
      }
    }
    setLoadingTransaction(false);
  };

  return (
    <>
      {infoClaimData && (
        <div className={classes.allocation}>
          <Typography variant="h5">
            {_.upperCase(dataClaim.stage_name)}
          </Typography>
          <p className={classes.text}>View Instructions</p>
          <div className={classes.container}>
            <div className={classes.info}>
              <div className={classes.tokenType}>
                <div className="label">Vesting Type</div>
                <div className="content">{dataClaim.vesting_type}</div>
              </div>
              <div className={classes.tokenType}>
                <div className="label">Total Amount</div>
                <div className="content">
                  {format_thousands_decimal(dataClaim.total_amount)}
                </div>
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
                <div className="content">
                  {format_thousands_decimal(dataClaim.claimed)} FLD
                </div>
              </div>

              <div className={classes.tokenType}>
                <div className="label">Available to Claim</div>
                <div className="content">
                  {format_thousands_decimal(availableClaim)} FLD
                </div>
              </div>

              <div style={{ width: "100%", height: 62, marginTop: 20 }}>
                <Button
                  disabled={loadingTransaction || availableClaim <= 0}
                  onClick={() => handleClaimToken()}
                >
                  CLAIM
                </Button>
              </div>
            </div>
            <div className={classes.lineChart}>
              <div className="labelY">CLAIMED TOKENS</div>
              <div>
                <LineChart data={data} width={700} height={500} />
                <p className="labelX">DAYS</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
