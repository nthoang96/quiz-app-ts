import React from "react";
import { Button, Menu, MenuItem, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setDisplayName } from "../../Login/loginSlice";
import { Redirect } from "react-router-dom";

interface MenuLogoutProps {
  displayName: string;
}

const MenuLogout: React.FC<MenuLogoutProps> = (props) => {
  const { displayName } = props;
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setDisplayName(""));
    localStorage.removeItem("displayName");
    <Redirect to="/" />;
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Typography color="textSecondary"> Hi, {displayName}</Typography>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorReference="none"
        PaperProps={{
          style: {
            top: 60,
            right: 30,
          },
        }}
      >
        <MenuItem onClick={handleLogout}>
          <Typography color="textSecondary">Logout</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MenuLogout;
