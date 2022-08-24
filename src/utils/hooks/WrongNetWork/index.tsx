import useMetaMask from "../useMetaMask";

export const CHAIN_ID = +(process.env.NEXT_PUBLIC_CHAIN_ID || "4");
// export interface WrongNetworkDialogProps extends BaseDialogProps {}

export const WrongNetworkDialog = ({ open, ...props }: any) => {
  const { switchNetwork } = useMetaMask();

  return <></>;
};
