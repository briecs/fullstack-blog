import { createContext, useState, useEffect } from "react";
 
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('currentUser')
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (loginDetails) => {
        setUser(loginDetails);
        localStorage.setItem('currentUser', JSON.stringify(loginDetails));
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            { children }
        </UserContext.Provider>
    );
}