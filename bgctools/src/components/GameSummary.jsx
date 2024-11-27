import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function GameSummary({handleSwitchDeck}) {
  return (
    <Card sx={{ minHeight: 150 }}>
      <CardContent>
        <Typography variant="h5" component="div" onClick={handleSwitchDeck}>
          Game Summary
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}
