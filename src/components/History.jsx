import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";

export default function History({history}) {
  const anchor = "right"
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List dense={true}>
        {history.map((message) => {return (
          <ListItem key={crypto.randomUUID()}>
            <ListItemText primary={message} />
          </ListItem>
        );}).reverse()}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <React.Fragment key={anchor}>
        <HistoryToggleOffIcon
          cursor="pointer"
          onClick={toggleDrawer(anchor, true)}
        />
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
