import React, {useState} from "react";
import PersonaContext from "./PersonaContext";
import personalities from "../personalities";

const PersonaContextProvider = ({children}) => {
    const [personality, setPersonality] = useState(personalities[0]);

    return (
        <PersonaContext.Provider value={{personality, setPersonality}}>
            {children}
        </PersonaContext.Provider>
    )
}

export default PersonaContextProvider