import { Box, Dialog, Link, Typography } from "@mui/material";
import useMetaMask from "../useMetaMask";

export const CHAIN_ID = +(process.env.NEXT_PUBLIC_CHAIN_ID || "4");
// export interface WrongNetworkDialogProps extends BaseDialogProps {}

export const WrongNetworkDialog = ({ open, ...props }: any) => {
  const { switchNetwork } = useMetaMask();

  const _open = open === undefined ? false : open;

  return (
    <Dialog
      open={_open}
      maxWidth="sm"
      PaperProps={{ sx: { py: 3, px: 5 } }}
      {...props}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src="/images/warning.png" alt="warning" width={60} height={60} />

        <Typography variant="h5" sx={{ mt: 1, mb: 2 }}>
          Wrong network
        </Typography>

        <Typography align="center">
          {
            "Cannot connect wallet because you're using wrong network. Please switch to "
          }
          <Link
            onClick={() => switchNetwork(CHAIN_ID)}
            component="button"
            color="#F44336"
            fontWeight="bold"
            underline="hover"
          >
            Ethereum
          </Link>
          .
        </Typography>
      </Box>
    </Dialog>
  );
};
