import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid2";
import DeckCard from "./DeckCard";
import DeckSummary from "./DeckSummary";
import DeckDraw from "./DeckDraw";
// import { useState } from "react";

export default function Deck({ deck, dealCard, getActiveCards, isOathsworn }) {
  const deckBackground = "rgb(255, 255, 255, 0.2)";

  const DisplayCards = () => {
    const activeCards = getActiveCards(deck, isOathsworn).sort((a, b) => a.drawOrder - b.drawOrder);
    return (
      <>
        {activeCards.map((card) => (
          <DeckCard
            key={card.cardID}
            value={card.value}
            isCrit={card.isCrit}
            colour={deck.toLowerCase()}
          />
        ))}
      </>
    );
  };

  return (
    <Card sx={{ minHeight: 600 }}>
      <Grid sx={{ backgroundColor: deckBackground }}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 6, md: 6 }}>
            <DeckSummary deck={deck} />
          </Grid>
          <Grid size={{ xs: 6, md: 6 }}>
            <DeckDraw dealCard={dealCard} deck={deck} isOathsworn={isOathsworn} />
          </Grid>
        </Grid>

        <Grid
          container
          rowSpacing={1}
          columnSpacing={2}
          p={1}
          sx={{ backgroundColor: "rgb(230, 240, 250)" }}
        >
          <DisplayCards />
        </Grid>
      </Grid>
      <CardActions></CardActions>
    </Card>
  );
}
