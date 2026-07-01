import { createContext,useState } from "react";

export const AuthContext = createContext()
export function AuthProvider({ children }){
    const [token,useToken] = useState(null)
    const [usuario,useUsuario] = useState(null)

    function login(token,user){
        useToken(token)
        useUsuario(user)
    }
    function logout(){
        useToken(null)
        useUsuario(null)
    }
    return (
        <AuthContext.Provider
            value={{
                token,
                usuario,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}