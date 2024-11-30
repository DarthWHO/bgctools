import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import DecksArea from "./DecksArea";
import GameSummaryArea from "./GameSummaryArea";
import TitleArea from "./TitleArea";

function MightDeckMain({
  historyMessages,
  decks,
  isOathsworn,
  executeFunction,
  cardsToDeal,
}) {
  return (
    <Box sx={{ flexGrow: 1, p: 1 }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 12 }}>
          <TitleArea history={historyMessages} isOathsworn={isOathsworn} />
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <GameSummaryArea
            decks={decks}
            isOathsworn={isOathsworn}
            executeFunction={executeFunction}
            cardsToDeal={cardsToDeal}
          />
        </Grid>
        <DecksArea
          decks={decks}
          isOathsworn={isOathsworn}
          executeFunction={executeFunction}
          cardsToDeal={cardsToDeal}
        />
      </Grid>
    </Box>
  );
}

export default MightDeckMain;
