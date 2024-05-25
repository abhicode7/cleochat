import React, {useState} from "react";
import DetailsContext from "./DetailsContext";

const DetailsContextProvider = ({children}) => {
    const [detailsbar, setDetailsbar] = useState(false);

    return (
        <DetailsContext.Provider value={{detailsbar, setDetailsbar}}>
            {children}
        </DetailsContext.Provider>
    )
}   

export default DetailsContextProvider