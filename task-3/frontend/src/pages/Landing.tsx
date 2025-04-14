import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

export default function Landing() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h4">Counter App</Typography>
      <Typography variant="body1">
        Little counter app, with server side persistence and authentication.
      </Typography>
    </Box>
  );
}
