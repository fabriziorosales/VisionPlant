import React from "react";
import List from "@mui/material/List";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ParkIcon from '@mui/icons-material/Park';
//ICONS
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const ListSidebar = () => {


  const navigate = useNavigate();

  return (
    <>
      
        <List>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            onClick={() => {
              navigate('/');
            }}
            >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"App"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>

          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            onClick={() => {
              navigate('/plants');
            }}
            >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <ParkIcon />
            </ListItemIcon>
            <ListItemText primary={"Plant"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>

        </List>
    </>
  );
};

export default ListSidebar;
