import { AppBar, Toolbar } from "@mui/material";
import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";

// const useStyles = makeStyles(theme => ({
//   root: {
//     backgroundColor: '#2E3B55',
//   },
// }));

export function Navbar () {
  // const classes = useStyles();

  return (
    <div>
      <AppBar position='static' style={{ background: '#2E3B55' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Cards</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
