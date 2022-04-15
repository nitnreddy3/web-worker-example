import React, { useEffect, useState } from "react";
import "./styles.css";
import WorkerBuilder from "./worker/worker-builder";
import Worker from "./worker/fetchUser.worker";
const instance = new WorkerBuilder(Worker);

const App = () => {
  const [counter, setCounter] = useState(0);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    instance.onmessage = (message) => {
      if (message) {
        console.log("Message from worker", message.data);
        setUsers(message.data);
      }
    };
  }, []);

  const getUser = async () => {
    let result = [];
    try {
      const response = await fetch("https://api.github.com/users");
      result = await response.json();
      setUsers(result);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchUsers = async () => {
    let result = [];
    let start = Date.now();
    while (Date.now() < start + 5000) {}
    getUser();
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>App</p>
        <div style={{}}>
          <div style={{ float: "left", width: "50%" }}>
            <p>Counter - {counter}</p>
            <button onClick={() => setCounter(counter + 1)}>Click</button>
          </div>
          <div style={{ float: "left", width: "50%" }}>
            <p>Github users</p>
            <ul style={{ listStyle: "none" }}>
              {users.map((user) => (
                <li style={{ textAlign: "left" }}>{user.login}</li>
              ))}
            </ul>
            <button
              onClick={() => {
                instance.postMessage("getUsers");
              }}
            >
              Fetch users with web worker
            </button>
            {/* <button onClick={() => fetchUsers()}>
              Fetch users 
            </button> */}
          </div>
        </div>
      </header>
    </div>
  );
};

export default App;
