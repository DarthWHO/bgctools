import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import History from "./History";
import Instructions from "./Instructions";

function TitleArea({ history, isOathsworn }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid size={1}>
          <Box display="flex" alignItems="left" justifyContent="left">
            <Instructions />
          </Box>
        </Grid>
        <Grid size={10}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography variant="h5" component="h5">
              {isOathsworn ? "Oathsworn" : "Enemy"} Might Deck
            </Typography>
          </Box>
        </Grid>
        <Grid size={1}>
          <Box display="flex" alignItems="right" justifyContent="right">
            <History history={history} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TitleArea;
