import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

export default function DeckDraw({
  deck,
  deckCards,
  isOathsworn,
  handleShuffle,
  cardsToDeal,
  updateCardsToDeal,
  handleDeal,
}) {
  const isRollDisabled = cardsToDeal[deck] ? false : true;

  const handleRoll = (direction) => {
    if (
      (cardsToDeal[deck] === 0 && direction === "down") ||
      (cardsToDeal[deck] === 18 - calculateAvailable() && direction === "up")
    ) {
      return;
    }
    if (direction === "up") {
      updateCardsToDeal(deck, cardsToDeal[deck] + 1);
    } else {
      updateCardsToDeal(deck, cardsToDeal[deck] - 1);
    }
  };

  const calculateCrits = () => {
    const totalCrits = deckCards.reduce((total, currentDeck) => {
      if (
        currentDeck.isOathsworn === isOathsworn &&
        currentDeck.deckColour === deck
      ) {
        currentDeck.deck.forEach((card) => {
          if (card.isActive && card.isCrit) {
            total += 1;
          }
        });
      }

      return total;
    }, 0);

    return totalCrits > 0;
  };

  const calculateIsSelected = () => {
    const totalCrits = deckCards.reduce((total, currentDeck) => {
      if (
        currentDeck.isOathsworn === isOathsworn &&
        currentDeck.deckColour === deck
      ) {
        currentDeck.deck.forEach((card) => {
          if (card.isActive && card.isSelected) {
            total += 1;
          }
        });
      }

      return total;
    }, 0);

    return totalCrits > 0;
  };

  const calculateAvailable = () => {
    return deckCards.reduce((total, deck) => {
      if (deck.isOathsworn === isOathsworn) {
        deck.deck.forEach((card) => {
          if (card.isActive) {
            total += 1;
          }
        });
      }
      return total;
    }, 0);
  };

  return (
    <Box>
      <Grid container spacing={0}>
        <Grid size={6}>
          <Stack
            direction="column"
            spacing={0.3}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              disabled={isRollDisabled}
              sx={{ width: "120px", m: 0 }}
              onClick={() => handleDeal(deck)}
            >
              Draw
            </Button>
            <Button
              // onClick={handleStuff}
              variant="outlined"
              disabled={!calculateIsSelected()}
              sx={{ width: "120px", m: 0 }}
            >
              Re-Draw
            </Button>
            <Button
              variant="outlined"
              disabled={!calculateCrits()}
              sx={{ width: "120px", m: 0 }}
            >
              Crits
            </Button>
            <Button
              onClick={() => handleShuffle(deck)}
              variant="outlined"
              sx={{ width: "120px", m: 0 }}
            >
              Shuffle
            </Button>
          </Stack>
        </Grid>
        <Grid size={6}>
          <Stack
            direction="column"
            spacing={1}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              aria-label="up"
              size="small"
              onClick={() => handleRoll("up")}
              sx={{ m: 0, p: 0 }}
            >
              <ArrowDropUpIcon sx={{ fontSize: 50 }} />
            </IconButton>
            <Typography variant="h4" component="h4" sx={{ m: 0, p: 0 }}>
              {cardsToDeal[deck]}
            </Typography>
            <IconButton
              aria-label="down"
              size="small"
              onClick={() => handleRoll("down")}
              sx={{ m: 0, p: 0 }}
            >
              <ArrowDropDownIcon sx={{ fontSize: 50 }} />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
