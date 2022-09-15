import { Button, Typography } from "@material-ui/core";
import _ from "lodash";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ClaimABI from "../../../abi/User-Claim.json";
import {
  getClaimList,
  getInfoClaim,
  postStatusClaim,
} from "../../../service/claim.service";
import { getContractConnect } from "../../../service/web";
import { format_thousands_decimal } from "../../../utils/common/fn";
import useMetaMask from "../../../utils/hooks/useMetaMask";
import Loading from "../../common/Loading";
import { TRANSACTION_TIMEOUT } from "../../web3/connector";
import LineChart from "../line-chart";
import useStyles from "./style";
import style from "./style.module.css";

type Props = {
  dataClaim: IDataClaim;
  key: number;
  fetchListJoinClaim: () => void;
};

export interface IDataClaim {
  claimed: number;
  id: number;
  stage_name: string;
  total_amount: string;
  vesting_type: string;
  vesting_type_id: number;
  available_to_claim: string;
  cliff: number;
  is_claiming: number;
  linear_vesting: any;
  next_unlock_in: number;
  tge: string;
  tge_claimed: string;
  token_pending: string;
  token_vested: string;
  investor_id: number;
}

export interface IClaim {
  allocation_token: string;
  cliff_duration: any;
  proof: string[];
  start_time: string;
  tge: number;
  vesting_duration: any;
  investor_id: string;
}

export default function Allocation({ dataClaim, fetchListJoinClaim }: Props) {
  const classes = useStyles();
  const { switchNetwork, wrongNetWork, account } = useMetaMask();
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const infoClaimData = useSelector((s: any) => s.claimAction.data);
  const [lineChartData, setLineChartData] = useState<any>();
  const [isClaming, setIsClaming] = useState<boolean>(false);

  const getDataLineChart = useCallback(async () => {
    await getClaimList(dataClaim.id);
  }, [dataClaim.is_claiming]);

  useEffect(() => {
    getDataLineChart();
  }, [getDataLineChart]);

  useEffect(() => {
    if (!dataClaim) return;
    if (dataClaim.is_claiming === 1) {
      setIsClaming(true);
    } else {
      setIsClaming(false);
    }
  }, [dataClaim]);

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
          investor_id,
        } = res.data;
        const contract = await getContractConnect(abi, contractAddress);
        try {
          await contract?.methods
            .claimToken(
              investor_id,
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
            .on("transactionHash", async () => {
              await postStatusClaim(dataClaim.investor_id);
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
        setLoadingTransaction(false);
        toast.error(`Not ready to claim round ${dataClaim?.stage_name}`);
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

  const isEmpty = (v: any) => {
    return Object.keys(v).length === 0;
  };

  const handleLineChart = useCallback(async () => {
    setLoadingTransaction(true);
    const res = await getClaimList(dataClaim.id);
    if (res.data) {
      if (!isEmpty(res.data)) {
        const clone = res.data
          .sort(function (a: any, b: any) {
            return (
              new Date(b.created_at).valueOf() -
              new Date(a.created_at).valueOf()
            );
          })
          .map((el: any, index: number) => {
            return {
              value: el.amount,
              name: moment(el.created_at).format("YYYY-MM-DD"),
            };
          });

        const listDate = Array.from(Array(7).keys())?.map((el) => {
          return {
            name: moment(clone[0].name).subtract(el, "d").format("YYYY-MM-DD"),
            value: 0,
          };
        });

        const listData = _.uniqBy([...clone, ...listDate], "name")
          .sort(function (a: any, b: any) {
            return new Date(b.name).valueOf() - new Date(a.name).valueOf();
          })
          .map((el: any) => {
            const date = moment(el.name).date();
            return { name: date, value: el.value };
          });

        listData.length = 7;

        listData.reverse();
        setLineChartData(listData);
      } else {
        const listDate = Array.from(Array(7).keys())
          ?.map((el) => {
            return {
              name: moment(Date()).subtract(el, "d").format("YYYY-MM-DD"),
              value: 0,
            };
          })
          .sort(function (a: any, b: any) {
            return new Date(b.name).valueOf() - new Date(a.name).valueOf();
          })
          .map((el: any) => {
            const date = moment(el.name).date();
            return { name: date, value: el.value };
          });
        listDate.reverse();
        setLineChartData(listDate);
      }
    } else {
      toast.error(res?.error.message);
    }
    setLoadingTransaction(false);
  }, [dataClaim.id, dataClaim.is_claiming]);

  useEffect(() => {
    handleLineChart();
  }, [handleLineChart]);

  return (
    <>
      <Loading open={loadingTransaction} />
      {infoClaimData && (
        <div className={classes.allocation}>
          <Typography variant="h5">
            {_.upperCase(dataClaim?.stage_name)}
          </Typography>
          <p className={classes.text}>View Instructions</p>
          <div className={classes.container}>
            <div className={classes.info}>
              <div className={classes.tokenType}>
                <div className="label">Vesting Type</div>
                <div className="content">{dataClaim?.vesting_type}</div>
              </div>
              <div className={classes.tokenType}>
                <div className="label">Total Amount</div>
                <div className="content">
                  {format_thousands_decimal(dataClaim?.total_amount)} FLD
                </div>
              </div>
              <div className={classes.tokenType}>
                <div className="label">Next Unlock In</div>
                <div className="content">
                  {dataClaim?.next_unlock_in}{" "}
                  {dataClaim?.next_unlock_in === 1 ? "Day" : "Days"}
                </div>
              </div>
              <div className={classes.tokenType}>
                <div className="label">Tokens Vested</div>
                <div className="content">
                  {format_thousands_decimal(dataClaim?.token_vested)} FLD
                </div>
              </div>
              <div className={classes.tokenType}>
                <div className="label">Tokens Pending</div>
                <div className="content">
                  {format_thousands_decimal(dataClaim?.token_pending)} FLD
                </div>
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
                  {format_thousands_decimal(dataClaim?.available_to_claim)} FLD
                </div>
              </div>

              <div style={{ width: "100%", height: 62, marginTop: 20 }}>
                <Button
                  disabled={
                    loadingTransaction ||
                    isClaming ||
                    Number(
                      format_thousands_decimal(dataClaim?.available_to_claim)
                    ) <= 0
                  }
                  onClick={() => handleClaimToken()}
                  // className={classes.btnClaim}
                >
                  <div className={classes.btnClaim}>
                    {isClaming ? "CLAIMING" : "CLAIM"}
                    {isClaming && <div className={style.loader}></div>}
                  </div>
                </Button>
              </div>
            </div>
            <div className={classes.lineChart}>
              <div className="labelY">CLAIMED TOKENS</div>
              <div className={classes.boxLineChart}>
                <LineChart data={lineChartData} width={700} height={500} />
                <p className="labelX">DAYS</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
