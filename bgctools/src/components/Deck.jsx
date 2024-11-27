import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid2";
import DeckCard from "./DeckCard";
import DeckSummary from "./DeckSummary";
import DeckDraw from "./DeckDraw";
import { useState } from "react";

export default function Deck({ deck, dealCard }) {
  const [deckBackground, setDeckBackground] = useState(
    "rgb(255, 255, 255, 0.2)"
  );

  // if (deck === "White") {
  //   setDeckBackground("rgb(255, 255, 255, 0.2)");
  // }
  // if (deck === "Yellow") {
  //   setDeckBackground("rgb(255, 255, 150, 0.1)");
  // }
  // if (deck === "Red") {
  //   setDeckBackground("rgb(255, 100, 100, 0.1)");
  // }
  // if (deck === "Black") {
  //   setDeckBackground("rgb(50, 50, 50, 0.1)");
  // }

  return (
    <Card sx={{ minHeight: 600 }}>
      <Grid sx={{ backgroundColor: deckBackground }}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 6, md: 6 }}>
            <DeckSummary deck={deck} />
          </Grid>
          <Grid size={{ xs: 6, md: 6 }}>
            <DeckDraw dealCard={dealCard} />
          </Grid>
        </Grid>

        <Grid
          container
          rowSpacing={1}
          columnSpacing={2}
          p={1}
          sx={{ backgroundColor: "rgb(230, 240, 250)" }}
        ></Grid>
      </Grid>
      <CardActions></CardActions>
    </Card>
  );
}
