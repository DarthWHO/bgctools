import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import Typography from "@mui/material/Typography";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";



export default function InstructionsListItem({primary, secondary}) {
  const enableSecondary = true;
  return (
    <ListItem>
      <ListItemIcon>
        <ArrowRightIcon />
      </ListItemIcon>
      <ListItemText
        primary={primary}
        secondary={enableSecondary ? secondary : null}
      />
    </ListItem>
  );
}
