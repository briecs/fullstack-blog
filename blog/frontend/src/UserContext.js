import { createContext, useState, useEffect } from "react";
 
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [ user, setUser ] = useState(() => {
        const savedUser = localStorage.getItem('currentUser');
        return (savedUser ? JSON.parse(savedUser) : null);
    })

    const login = (loginDetails) => {
        setUser(loginDetails.user);
        localStorage.setItem('access_token', loginDetails.access_token);
        localStorage.setItem('currentUser', JSON.stringify(loginDetails.user));
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('currentUser');
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            { children }
        </UserContext.Provider>
    );
}