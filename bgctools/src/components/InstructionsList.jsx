import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid2";
import InstructionsListItem from "./InstructionsListItem";

const instructions = [
  {
    id: 0,
    primary: "Select how many to draw from each deck. Click 'Draw All'",
    secondary: "",
  },
  {
    id: 1,
    primary: "Click on 'End Draw' to clear the drawn cards",
    secondary: "",
  },
  {
    id: 2,
    primary: "Click on 'Shuffle' to manually shuffle a deck",
    secondary: "",
  },
  {
    id: 3,
    primary: "CRIT: if a crit is drawn, be sure to draw additional cards",
    secondary: "Misses will not count",
  },
  {
    id: 4,
    primary:
      "Chances: select your cards and calculate odds of success before drawing",
    secondary: "(BETA)",
  },
  {
    id: 5,
    primary: "Switch between Oathsworn and Enemy using the 'Switch' button",
    secondary: "Note: will end the current draw",
  },
];

export default function InstructionsList() {
  const dense = true;

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <List dense={dense}>
            {instructions.map((instruction) => {
              return (
                <InstructionsListItem
                  key={instruction.id}
                  primary={instruction.primary}
                  secondary={instruction.secondary}
                />
              );
            })}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}
