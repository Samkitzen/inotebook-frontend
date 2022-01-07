import { useState} from "react";
import alertContext from "./alertContext";

const Alertstate = (props) => {

    const [alert, setAlert] = useState({msg:"Welcome!",type:"success"});
    const showAlert = (message, type) => {
      console.log("showAlert called");
      setAlert({
        msg: message,
        type: type
      });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }
return (
    <alertContext.Provider value={{showAlert,alert}}>
      {props.children}
    </alertContext.Provider>
  )
}

export default Alertstate;