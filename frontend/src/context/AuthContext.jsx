import { createContext, useState, useContext, useEffect } from "react";


const AuthContext = createContext();

export function AuthProvider({ children }){
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if(storedUser){
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
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
         <AuthContext.Provider value={{ user, login, logout ,loading}}>
            {children}
         </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}