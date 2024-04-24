import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';


type Props = {
    open : boolean | any,
    onClose :  ()=>void | any; 
    onMyNotes: ()=>void| any;
    setNewFormFunction: ()=>void| any;
}
const Sidebar = ({ open , onClose , onMyNotes , setNewFormFunction}:Props) => {
  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      anchor="right" // Positioning the Drawer on the right side
      sx={{
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        <ListItem button>
          <ListItemText primary="My Notes"  onClick={onMyNotes}/>
        </ListItem>
        <ListItem button>
          <ListItemText primary="Add Notes" onClick={setNewFormFunction}/>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
