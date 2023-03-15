import { User, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { WikiUser } from "../Models/WikiUser";
import { auth } from "../firebase";


const defaultUser: WikiUser = {
    
        uid: "",
        email: "",
        isAuthenticated: false,
      
}

const AuthContext = createContext<any>(
   {
        currentUser: defaultUser,
        signUp:   createUserWithEmailAndPassword,
   }
);

export const useAuth = ()=>{
    return useContext(AuthContext);
}

interface AuthProviderProps{
    children: ReactNode,
}

export const AuthProvider = ({children}: AuthProviderProps) =>{

    const [currentUser, setCurrentUser] = useState<WikiUser>(defaultUser);

    const userCredential = ()=>{
       
        
    }
    const signUpFirebase = (email: string, password: string)=>{
        return createUserWithEmailAndPassword(auth, email, password );
    }

    const logInFirebase = (email: string, password: string): Promise<UserCredential>  =>{
        return signInWithEmailAndPassword(auth,email,password  );
    }

    const signOutFirebase = ()=>{
        return signOut(auth).then(()=>{
            setCurrentUser(defaultUser);
        });
    }

    useEffect(()=>{
        const unsubcrible = auth.onAuthStateChanged((user)=>{
            if(user){
                const newUser: WikiUser  = {
                    uid: user?.uid,
                    email: user?.email as string,
                    isAuthenticated: true
                }
                setCurrentUser(newUser)
          
            }
            
        })

        return unsubcrible;
    },[])

    const authContextValue = {
        currentUser,
        signUpFirebase,
        logInFirebase,
        signOutFirebase,
        userCredential
    }

    return(
        <AuthContext.Provider value = {authContextValue}>
            {children}
        </AuthContext.Provider>
    )
}