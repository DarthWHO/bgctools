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
  const isRollDisabled = cardsToDeal[colour] ? false : true;
  let localCrits = 0;
  let localRedraws = 0;

  const handleDirectionButtons = (direction) => {
    if (
      (cardsToDeal[colour] === 0 && direction === "down") ||
      (cardsToDeal[colour] === 18 - calculateAvailable() && direction === "up")
    ) {
      return;
    }
    updateCardsToDraw(direction);
  };

  const updateCardsToDraw = (direction) => {
    if (direction === "up") {
      executeFunction("updateCardsToDeal", colour, cardsToDeal[colour] + 1);
    } else {
      executeFunction("updateCardsToDeal", colour, cardsToDeal[colour] - 1);
    }
  };

  // const handleReDrawCards = () => {
  //   for (let index = 0; index < localRedraws; index++) {
  //     updateCardsToDraw("up");
  //   }
  // };

  // const handleCritDraw = () => {
  //   console.log("here");
  //   for (let index = 0; index < localCrits; index++) {
  //     updateCardsToDraw("up");
  //   }
  // };

  const calculateCrits = () => {
    const totalCrits = deckCards.reduce((total, currentDeck) => {
      if (
        currentDeck.isOathsworn === isOathsworn &&
        currentDeck.deckColour === colour
      ) {
        currentDeck.deck.forEach((card) => {
          if (card.isActive && card.isSelected && card.isCrit) {
            total += 1;
          }
        });
      }

      return total;
    }, 0);
    localCrits = totalCrits
    return totalCrits > 0;
  };

  const calculateIsSelected = () => {
    const totalSelected = deckCards.reduce((total, currentDeck) => {
      if (
        currentDeck.isOathsworn === isOathsworn &&
        currentDeck.deckColour === colour
      ) {
        currentDeck.deck.forEach((card) => {
          if (card.isActive && card.isSelected && !card.isCrit) {
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
              onClick={() => executeFunction("handleDeal", colour, true, false)}
            >
              Re-Draw {localRedraws === 0 ? "" : `(${localRedraws})`}
            </Button>
            <Button
              variant="outlined"
              disabled={!calculateCrits()}
              sx={{ width: "120px", m: 0 }}
              onClick={() => executeFunction("handleDeal", colour, true, true)}
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
              onClick={() => handleDirectionButtons("up")}
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
              onClick={() => handleDirectionButtons("down")}
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

export default DeckButtons;
