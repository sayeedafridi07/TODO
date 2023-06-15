import {List, ListItem, ListItemText } from "@mui/material";
import React from "react";


function Todo({ todo, time }) {
  return (
    <>
      <div className="container">
        <List>
          <ListItem>
            <ListItemText primary={todo.todo} secondary={time} />
          </ListItem>
        </List>
      </div>
    </>
  );
}

export default Todo;
