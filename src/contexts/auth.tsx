import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {User} from '../components/models';
import {INITIAL_STATE, INITIAL_USER} from '../store/modules/auth';
import { STORAGE_AUTH_USER, STORAGE_AUTH_TOKEN, AuthState } from '../store/modules/auth/types';

/**
 * Contexto de autorização, utilizado nos Function Components para conexão ao usuário.
 */
const AuthContext = createContext(INITIAL_STATE);

/**
 * Função para verificar na Storage a informação do usuário e retornando-a.
 */
export async function CheckAuth(){
    return CheckAuthSync();
}

/**
 * Função para verificar na Storage a informação do usuário e retornando-a.
 */
export function CheckAuthSync(){
    const storageUser = localStorage.getItem(STORAGE_AUTH_USER);
    const storageToken = localStorage.getItem(STORAGE_AUTH_TOKEN);
    if (storageUser && storageToken) {
        const aUser = JSON.parse(storageUser);
        let newUser: User = {
            id: aUser._id,
            email: aUser.email,
            name: aUser.name,
            password: null,
            joinAt: new Date(aUser.joinAt),
            lastVisit: new Date(aUser.lastVisit)                    
        };
        return { user: newUser, token: storageToken }
    } else 
        return { user: undefined, token: "" }
}

/**
 * Provem conexão com o estado do usuário.
 */
export const AuthProvider: React.FC<{}> = ({ children }) => {

    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);
    const [userToken, setUserToken] = useState("");

    useEffect(() => {
        async function loadStorageData() {
            CheckAuth().then(data => {                
                setUser(data?.user);
                setUserToken(data?.token);
                setLoading(false);
            })
        }

        loadStorageData();
    }, [])

    return (
        <AuthContext.Provider value={{...INITIAL_STATE, user: user ?? INITIAL_USER, loading, userToken, isLogged: !!user }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
