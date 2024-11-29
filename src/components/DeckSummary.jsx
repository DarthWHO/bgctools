import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function DeckSummary({ deck, deckCards }) {
  const calculateSummary = (deckDetails) => {
    const counts = deckDetails.reduce((acc, deck) => {
      deck.deck.forEach((card) => {
        if (!card.isDealt) {
          const description = card.isCrit
            ? `Crit (${card.value})`
            : card.description === "hit"
            ? `Hit (${card.value})`
            : "Miss";

          if (!acc[description]) {
            acc[description] = 0;
          }
          acc[description] += 1;
        }
      });
      return acc;
    }, {});

    const totalCards = Object.values(counts).reduce(
      (sum, count) => sum + count,
      0
    );

    const summary = Object.entries(counts).map(([description, count]) => ({
      description,
      count,
      percentage: ((count / totalCards) * 100).toFixed(0),
    }));

    return summary;
  };

  const DisplaySummary = () => {
    const summary = calculateSummary(deckCards);

    return (
      <div>
        {summary.map(({ description, count, percentage }) => (
          <Typography key={description} variant="body2" component="p">
            <Grid container spacing={1}>
              <Grid size={5}>{description}:</Grid>
              <Grid size={1}>{count}</Grid>
              <Grid size={6}>- {percentage}%</Grid>
            </Grid>
          </Typography>
        ))}
      </div>
    );
  };

  return (
    <Box>
      <Grid container>
        <Grid size={12}>
          <Typography variant="h5" component="p">
            {deck} deck
          </Typography>
        </Grid>
        <Grid size={12}>
          <Box >
            <Stack direction="column" spacing={0} pr={0}>
              <DisplaySummary />
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
