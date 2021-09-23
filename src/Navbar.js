import { AppBar, Toolbar } from "@mui/material";
import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from "react-router";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";

const useStyles = makeStyles({
  // This group of buttons will be aligned to the right
  rightToolbar: {
    marginLeft: "auto",
    marginRight: 0,
  },
});

function Navbar() {
  const history = useHistory();
  const classes = useStyles();
  // anchorEl is the html hamburger and it is used to 
  // set the position of the menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  const issmallScreens = useMediaQuery("(max-width:400px)");

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleIconClick = (navigationToPage) => {
    history.push(navigationToPage);
  };

  const handleItemMenuClick = (navigatoToPage) => {
    console.log(anchorEl);
    history.push(navigatoToPage);
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="static" style={{ background: "#2E3B55" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cards
          </Typography>
          <section className={classes.rightToolbar}>
            {issmallScreens ? (
              <>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem onClick={() => handleItemMenuClick("/")}>
                    Home
                  </MenuItem>
                  <MenuItem onClick={() => handleItemMenuClick("/graphs")}>
                    Graphs
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button onClick={() => handleIconClick("/")} color="inherit">
                  HOME
                </Button>
                <Button onClick={() => handleIconClick("/graphs")} color="inherit">
                  GRAPHS
                </Button>
              </>
            )}
          </section>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
