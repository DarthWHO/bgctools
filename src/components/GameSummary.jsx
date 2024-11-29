import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function GameSummary({
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

  const total = 4;
  const crits = 2;
  const misses = 0;

  return (
    <Card sx={{ minHeight: 150 }}>
      <CardContent>
        <Box>
          <Grid container>
            <Grid size={5}>
              <Box display="flex" justifyContent="flex-end">
                <Stack direction="column" spacing={1} pr={0}>
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
            <Grid size={5}>
              <Stack direction="column" spacing={1} pl={3}>
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
            <Grid size={2}>
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
                  onClick={() => handleDeal("all")}
                >
                  Draw All
                </Button>
                <Button
                  variant="outlined"
                  disabled={false}
                  sx={{ width: "100%", m: 0 }}
                  onClick={handleSwitchDeck}
                >
                  Switch
                </Button>
                <Button
                  variant="outlined"
                  disabled={false}
                  sx={{ width: "100%", m: 0 }}
                  onClick={handleEndDraw}
                >
                  End Draw
                </Button>
                <Button variant="outlined" sx={{ width: "100%", m: 0 }}>
                  Display Chances
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}
