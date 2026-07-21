import { createContext, useState, useContext, useEffect } from "react";


const AuthContext = createContext();

export function AuthProvider({ children }){
   const [user, setUser] = useState(null);

   useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if(storedUser){
        setUser(JSON.parse(storedUser));
      }
   }, []);

   const login = (userData, accessToken) => {
        setUser(userData);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(userData));
   };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  };

    return (
         <AuthContext.Provider value={{ user, login, logout }}>
            {children}
         </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}