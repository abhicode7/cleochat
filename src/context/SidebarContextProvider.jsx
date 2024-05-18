import React, {useState} from "react";
import SidebarContext from "./SidebarContext";

const SidebarContextProvider = ({children}) => {
    const [sidebar, setSidebar] = useState(false);

    return (
        <SidebarContext.Provider value={{sidebar, setSidebar}}>
            {children}
        </SidebarContext.Provider>
    )
}   

export default SidebarContextProvider