import { Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import useMetaMask from "../../utils/hooks/useMetaMask";
import { WrongNetwork } from "../WrongNetWork";
import Allocation from "./allocation";
import useStyles from "./style";

export default function ClaimPage() {
  const classes = useStyles();
  const { wrongNetWork, account } = useMetaMask();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!account) return;
    // dispatch(fetchInfoClaim("1"));
  }, []);

  return (
    <div className={classes.claim}>
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
        <Allocation />
      </div>
    </div>
  );
}
