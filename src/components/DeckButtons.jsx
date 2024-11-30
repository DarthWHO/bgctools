import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

function DeckButtons({
  colour,
  deckCards,
  isOathsworn,
  cardsToDeal,
  executeFunction,
}) {
  console.log(colour)
  const isRollDisabled = cardsToDeal[colour] ? false : true;
  let localCrits = 0;
  let localRedraws = 0;

  const handleRoll = (direction) => {
    if (
      (cardsToDeal[colour] === 0 && direction === "down") ||
      (cardsToDeal[colour] === 18 - calculateAvailable() && direction === "up")
    ) {
      return;
    }
    if (direction === "up") {
      executeFunction("updateCardsToDeal", colour, cardsToDeal[colour] + 1);
    } else {
      executeFunction("updateCardsToDeal", colour, cardsToDeal[colour] - 1);
    }
  };

  const handleRedraw = () => {
    executeFunction("updateCardsToDeal", colour, cardsToDeal[colour] + 1);
    executeFunction("handleDeal", colour);
  };

  const handleCritDraw = () => {
    console.log("here");
  };

  const calculateCrits = () => {
    const totalCrits = deckCards.reduce((total, currentDeck) => {
      if (
        currentDeck.isOathsworn === isOathsworn &&
        currentDeck.deckColour === colour
      ) {
        currentDeck.deck.forEach((card) => {
          if (card.isActive && card.isCrit) {
            total += 1;
          }
        });
      }

      return total;
    }, 0);
    localCrits = totalCrits;
    return totalCrits > 0;
  };

  const calculateIsSelected = () => {
    const totalSelected = deckCards.reduce((total, currentDeck) => {
      if (
        currentDeck.isOathsworn === isOathsworn &&
        currentDeck.deckColour === colour
      ) {
        currentDeck.deck.forEach((card) => {
          if (card.isActive && card.isSelected) {
            total += 1;
          }
        });
      }

      return total;
    }, 0);
    localRedraws = totalSelected;
    return totalSelected > 0;
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
              onClick={() => executeFunction("handleDeal", colour)}
            >
              Draw
            </Button>
            <Button
              variant="outlined"
              disabled={!calculateIsSelected()}
              sx={{ width: "120px", m: 0 }}
              onClick={handleRedraw}
            >
              Re-Draw {localRedraws === 0 ? "" : `(${localRedraws})`}
            </Button>
            <Button
              variant="outlined"
              disabled={!calculateCrits()}
              sx={{ width: "120px", m: 0 }}
              // onClick={() => handleDeal(deck, false, true)}
            >
              Crits {localCrits === 0 ? "" : `(${localCrits})`}
            </Button>
            <Button
              onClick={() => executeFunction("handleShuffle", colour)}
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
              {cardsToDeal[colour]}
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

export default DeckButtons
