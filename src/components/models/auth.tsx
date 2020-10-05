import { User } from './user';

export interface Auth {
    token: string;
    data: User;
}