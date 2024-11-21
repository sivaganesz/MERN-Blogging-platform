<<<<<<< HEAD
import { Children, createContext, useEffect,useState } from "react";

export const UserContext = createContext();

const UserProvider = ({children}) => {
    const [currentUser , setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')))

    useEffect(()=>{
        localStorage.setItem('user',JSON.stringify(currentUser),[currentUser])

    })
return <UserContext.Provider value={{currentUser,setCurrentUser}}>
    {children}
</UserContext.Provider>
}

=======
import { Children, createContext, useEffect,useState } from "react";

export const UserContext = createContext();

const UserProvider = ({children}) => {
    const [currentUser , setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')))

    useEffect(()=>{
        localStorage.setItem('user',JSON.stringify(currentUser),[currentUser])

    })
return <UserContext.Provider value={{currentUser,setCurrentUser}}>
    {children}
</UserContext.Provider>
}

>>>>>>> 8e56e10c44ed715152572326d6bfe6ee3e1ca8fe
export default UserProvider