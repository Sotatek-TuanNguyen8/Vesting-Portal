import { Button, Divider, Typography } from "@material-ui/core";
import Chart from "../../chart";
import useStyles from "./style";

type Props = {};

export default function Seed({}: Props) {
  const classes = useStyles();
  return (
    <div className={classes.seed}>
      <Typography variant="h5">PRE SEED</Typography>
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
            <div className="label">Tokens Pending</div>
            <div className="content">500,000 FLD</div>
          </div>
          <div className={classes.tokenType}>
            <div className="label">Tokens Claimed</div>
            <div className="content">400 FLD</div>
          </div>
          <div className={classes.tokenType}>
            <div className="label">Tokens Vested</div>
            <div className="content">0 FLD</div>
          </div>
          <div className={classes.tokenType}>
            <div className="label">Available to Claim</div>
            <div className="content">406 FLD</div>
          </div>
          <div style={{ width: "100%", height: 62 }}>
            <Button>CLAIM</Button>
          </div>
          <Divider />
          <div className={classes.tokenType}>
            <div className="label">Available to Claim</div>
            <div className="content">406 FLD</div>
          </div>
          <div style={{ width: "100%", height: 62, marginBottom: 20 }}>
            <Button>CLAIM</Button>
          </div>
        </div>
        <div className={classes.lineChart}>
          <Chart />
        </div>
      </div>
    </div>
  );
}
