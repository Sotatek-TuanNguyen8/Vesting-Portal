import useMetaMask from "../../utils/hooks/useMetaMask";
import useStyles from "./style";

export const WrongNetwork = () => {
  const classes = useStyles();
  const { switchNetwork } = useMetaMask();

  const handleSwitchNetwork = async () => {
    await switchNetwork();
  };

  return (
    <div className={classes.wrong}>
      The configured network on your wallet does not match with the network of
      the system.{" "}
      <span onClick={handleSwitchNetwork}> Click here to switch</span>
    </div>
  );
};
