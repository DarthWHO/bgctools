import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function GameSummary({ handleSwitchDeck, handleEndDraw }) {
  const isRollDisabled = true;

  return (
    <Card sx={{ minHeight: 150 }}>
      <CardContent>
        <Box>
          <Grid container spacing={1}>
            <Grid size={10}>Other things</Grid>
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
                  // onClick={handleDeal}
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
