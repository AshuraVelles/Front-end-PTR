//import './App.css'
import { useState } from "react";
import Alert from "./Components/Alert";
import Button from "./Components/Button";

function App(){

const [alertVisible,setAlertVisibility] = useState(false)

    return <div>
      {alertVisible && <Alert onClose={() => setAlertVisibility(false)}>My alert</Alert>}
      <Button onClick={() => setAlertVisibility(true)}> My button </Button>
      </div>;
}

export default App;