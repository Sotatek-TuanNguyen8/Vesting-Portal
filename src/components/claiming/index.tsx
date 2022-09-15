import { Typography } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { getListJoinClaim } from "../../service/claim.service";
import useMetaMask from "../../utils/hooks/useMetaMask";
import { SocketEvent } from "../../utils/types/socket";
import Loading from "../common/Loading";
import { useSocket } from "../hooks/useSocket";
import { WrongNetwork } from "../WrongNetWork";
import Allocation, { IDataClaim } from "./allocation";
import useStyles from "./style";

export default function ClaimPage() {
  const classes = useStyles();
  const { wrongNetWork } = useMetaMask();
  const [listClaim, setListClaim] = useState<IDataClaim[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { socket, registerListener, unregisterListener } = useSocket();

  useEffect(() => {
    socket.emit("identity", localStorage.getItem("access_token"));
    registerListener(SocketEvent.Claim_success, async (data) => {
      await fetchListJoinClaim();
    });
    return () => {
      unregisterListener(SocketEvent.Claim_success, () => {});
    };
  }, []);

  console.log(listClaim);

  const fetchListJoinClaim = useCallback(async () => {
    setIsLoading(true);
    const res = await getListJoinClaim();
    if (res?.data) {
      setListClaim(res.data);
    } else {
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchListJoinClaim();
  }, [fetchListJoinClaim]);

  return (
    <div className={classes.claim}>
      <Loading open={isLoading} />
      {wrongNetWork && <WrongNetwork />}
      <Typography variant="h5">CLAIMING</Typography>
      <p className={classes.desc}>
        If you have invested in FLUID, then you’re in the right place! FLUID’s
        claims portal will help visualize the total amount you have invested, at
        what round, and a timeline of vested available to claim versus total
        across the vested period. It will also allow you to claim your tokens
        into your preferred wallet.
      </p>
      <div>
        {listClaim?.map((el, index) => (
          <Allocation
            dataClaim={el}
            key={index}
            fetchListJoinClaim={fetchListJoinClaim}
          />
        ))}
      </div>
    </div>
  );
}
