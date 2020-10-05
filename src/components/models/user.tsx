export interface User {
    id: string | null,
    name: string | null,
    email: string | null,
    password: string | null,
    joinAt: Date | null,
    lastVisit: Date | null
};