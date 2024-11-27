import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";

export default function DeckDraw({dealCard, deck, isOathsworn}) {
  const [value, setValue] = useState(0);
  const isRollDisabled = value ? false: true
  const handleRoll = (direction) => {
    if (
      (value === 0 && direction === "down") ||
      (value === 18 && direction === "up")
    ) {
      return;
    }
    if (direction === "up") {
      setValue(value + 1);
    } else {
      setValue(value - 1);
    }
  };

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid size={6}>
          <Stack
            direction="column"
            spacing={0.3}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <Button
              variant="contained"
              disabled={isRollDisabled}
              sx={{ width: "100%", m: 0 }}
              onClick={() => dealCard(deck, isOathsworn)}
            >
              Draw
            </Button>
            <Button variant="outlined" disabled sx={{ width: "100%", m: 0 }}>
              Re-Draw
            </Button>
            <Button variant="outlined" disabled sx={{ width: "100%", m: 0 }}>
              Crits
            </Button>
            <Button variant="outlined" sx={{ width: "100%", m: 0 }}>
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
              {value}
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
