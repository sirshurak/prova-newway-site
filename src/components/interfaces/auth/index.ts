import { AuthState } from "../../../store/modules/auth/types";
import { Auth, User } from "../../models";
import { OwnProps, DispatchProps } from "../props";

export interface AuthProps extends OwnProps {
    _user: User;
    _isLogged: boolean;
}

export interface AuthDispatchProps extends DispatchProps {    
    login(email: string, password: string): void
    logout(): void
}