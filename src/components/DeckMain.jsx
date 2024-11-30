import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid2";
import DeckCardsArea from "./DeckCardsArea";
import DeckSummary from "./DeckSummary";
import DeckButtons from "./DeckButtons";
// import { useState } from "react";

function DeckMain({
  isOathsworn,
  executeFunction,
  deck,
  deckCards,
  cardsToDeal,
}) {
  const deckBackground = "rgb(255, 255, 255, 0.2)";

  return (
    <Card sx={{ minHeight: 0, backgroundColor: "rgb(230, 240, 250)" }}>
      <Grid sx={{ backgroundColor: deckBackground }}>
        <Grid
          container
          spacing={1}
          sx={{ backgroundColor: "rgb(255, 255, 255)" }}
        >
          <Grid size={{ xs: 6, md: 6 }}>
            <DeckSummary deck={deck} deckCards={deckCards} />
          </Grid>
          <Grid size={{ xs: 6, md: 6 }}>
            <DeckButtons
              deck={deck}
              deckCards={deckCards}
              isOathsworn={isOathsworn}
              executeFunction={executeFunction}
              cardsToDeal={cardsToDeal}
            />
          </Grid>
        </Grid>

        <Grid container rowSpacing={1} columnSpacing={2} p={1} pb={0}>
          <DeckCardsArea
            deck={deck}
            isOathsworn={isOathsworn}
            executeFunction={executeFunction}
          />
        </Grid>
      </Grid>
      <CardActions></CardActions>
    </Card>
  );
}

export default DeckMain;