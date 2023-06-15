import { Button, FormControl, Input, InputLabel } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./App.css";
import Todo from "./components/Todo";
import db from "./firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  console.log("🔫", input);

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        //onSnapshot jab bhi database me change hoga ye camera ki tarh snap lega aur snap dega
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        ); //docs hogya har ek todo jo hm database me add krenge and doc.data object bna kr dega .todo ka matlab sara doc jo bhi todo hai usko laao
      });
  }, []);

  const add = (event) => {
    event.preventDefault(); // refresh nahi hone dega sala ft. Pushpa Raj
    // setTodos([...todos, input]); ab locally nhi seedha database me dalega re baba
    db.collection("todos").add({
      // mai database me dalega re baba
      todo: input,
      // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput(""); //mai input field clear kr dega re baba
  };
  return (
    <>
      <div className="App">
        <h1>Hello There</h1>
        {/* target.value karne se input wali chiz fetch ho rhi hai */}
        <form>
          <FormControl>
            <InputLabel>✅ Write a Todo</InputLabel>
            <Input
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            {/*we are mapping the value of input field with the input array*/}
          </FormControl>
          <Button
            type="submit"
            onClick={add}
            variant="contained"
            color="primary"
          >
            {" "}
            Add Todo
          </Button>
        </form>

        <ul>
          {todos.map((todo, x) => (
            <Todo todo={todo} key={x} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
