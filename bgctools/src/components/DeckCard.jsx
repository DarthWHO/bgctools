import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

const CARDHEIGHT = 70;
const CIRCLESIZE = 68;

export default function DeckCard({ value, isCrit, colour }) {
  const displayValue = isCrit ? "{ " + value + " }" : value
  return (
    <Grid size={6}>
      <Box
        display="flex"
        component="section"
        alignItems="center"
        justifyContent="center"
        sx={{
          flexGrow: 1,
          p: 2,
          height: CARDHEIGHT,
          borderRadius: 2,
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
          <Typography variant="h4" component="h4">
            {displayValue}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );


}