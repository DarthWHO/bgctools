import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function GameSummary({
  decks,
  handleSwitchDeck,
  handleEndDraw,
  handleDeal,
  cardsToDeal,
}) {
  const cardTotal =
    cardsToDeal["White"] +
    cardsToDeal["Yellow"] +
    cardsToDeal["Red"] +
    cardsToDeal["Black"];
  const isRollDisabled = cardTotal ? false : true;

  const calculateTotalValue = (decks) => {
    return decks.reduce((total, deck) => {
      if (deck.isOathsworn) {
        deck.deck.forEach((card) => {
          if (card.isActive) {
            total += card.value;
          }
        });
      }
      return total;
    }, 0);
  };

  const calculateCrits = (decks) => {
    return decks.reduce((total, deck) => {
      if (deck.isOathsworn) {
        deck.deck.forEach((card) => {
          if (card.isActive && card.isCrit) {
            total += 1;
          }
        });
      }
      return total;
    }, 0);
  };

  const calculateMisses = (decks) => {
    return decks.reduce((total, deck) => {
      if (deck.isOathsworn) {
        deck.deck.forEach((card) => {
          if (card.isActive && card.isMiss) {
            total += 1;
          }
        });
      }
      return total;
    }, 0);
  };

  const total = calculateTotalValue(decks);
  const crits = calculateCrits(decks);
  const misses = calculateMisses(decks);

  return (
    <Card>
      <CardContent>
        <Box>
          <Grid container>
            <Grid size={6}>
              <Box display="flex" justifyContent="flex-end">
                <Stack direction="column" spacing={0} pr={0} pt={2}>
                  <Typography variant="h5" component="p">
                    Total:
                  </Typography>
                  <Typography variant="h5" component="p">
                    Crits:
                  </Typography>
                  <Typography variant="h5" component="p">
                    Misses:
                  </Typography>
                </Stack>
              </Box>
            </Grid>
            <Grid size={2}>
              <Stack direction="column" spacing={0} pl={3} pt={2}>
                <Typography variant="h5" component="p">
                  {total}
                </Typography>
                <Typography variant="h5" component="p">
                  {crits}
                </Typography>
                <Typography variant="h5" component="p">
                  {misses}
                </Typography>
              </Stack>
            </Grid>
            <Grid size={4}>
              <Box display="flex" justifyContent="flex-end">
                <Stack direction="column">
                  <Button
                    variant="contained"
                    disabled={isRollDisabled}
                    sx={{ width: "170px", m: 0 }}
                    onClick={() => handleDeal("all")}
                  >
                    Draw All
                  </Button>
                  <Button
                    variant="outlined"
                    disabled={false}
                    sx={{ width: "170px", m: 0 }}
                    onClick={handleSwitchDeck}
                  >
                    Switch
                  </Button>
                  <Button
                    variant="outlined"
                    disabled={false}
                    sx={{ width: "170px", m: 0 }}
                    onClick={handleEndDraw}
                  >
                    End Draw
                  </Button>
                  <Button variant="outlined" sx={{ width: "170px", m: 0 }}>
                    Display Chances
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}
