import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

export default function DeckSummary({ deck }) {
  return (
    <Box>
      <Stack>
        <Typography variant="h6" component="h6">
          {deck} Deck
        </Typography>

        <Typography variant="body2" component="p" sx={{ m: 0, p: 0 }}>
          Miss : 6 - 33%
        </Typography>
        <Typography variant="body2" component="p" sx={{ m: 0, p: 0 }}>
          Hit 1 : 6 - 33%
        </Typography>
        <Typography variant="body2" component="p" sx={{ m: 0, p: 0 }}>
          Hit 2 : 3 - 17%
        </Typography>
        <Typography variant="body2" component="p" sx={{ m: 0, p: 0 }}>
          Hit 3 : 3 - 17%
        </Typography>
      </Stack>
    </Box>
  );
}
