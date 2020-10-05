import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {User} from '../components/models';
import {INITIAL_STATE, INITIAL_USER} from '../store/modules/auth';
import { STORAGE_AUTH_USER, STORAGE_AUTH_TOKEN, AuthState } from '../store/modules/auth/types';

const AuthContext = createContext(INITIAL_STATE);

export async function CheckAuth(){
    const storageUser = await AsyncStorage.getItem(STORAGE_AUTH_USER);
    const storageToken = await AsyncStorage.getItem(STORAGE_AUTH_TOKEN);
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
