import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

const CARDHEIGHT = 70;
const CIRCLESIZE = 64;

export default function DeckCard({ card, colour, handleSelected }) {

  const toggleSelected = () => {
    handleSelected(card.cardID)
  }

  const displayValue = card.isCrit ? "{ " + card.value + " }" : card.value
  return (
    <Grid size={6}>
      <Box
        display="flex"
        component="section"
        alignItems="center"
        justifyContent="center"
        onClick={toggleSelected}
        sx={{
          cursor: "pointer",
          flexGrow: 1,
          p: 2,
          height: CARDHEIGHT,
          borderRadius: 2,
          border: card.isSelected ? "1px solid" : "0px",
          borderColor: card.isSelected ? "green" : "grey",
          boxShadow: card.isSelected ? "2px 4px rgba(0, 0, 0, 0.3)" : "0px 0px",
          bgcolor: colour,
        }}
      >
        <Box
          display="flex"
          component="section"
          alignItems="center"
          justifyContent="center"
          sx={{
            height: CIRCLESIZE,
            width: CIRCLESIZE,
            borderRadius: 100,
            bgcolor: "white",
            border: "1px solid",
          }}
        >
          <Typography
            variant="h4"
            component="h4"
            color={
              card.isCrit
                ? "rgba(0, 0, 0, 1)"
                : card.isMiss
                ? "rgba(255, 0, 0, .6)"
                : "rgba(0, 0, 0, .7)"
            }
          >
            {displayValue}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );


}