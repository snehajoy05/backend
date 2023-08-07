import { Role } from "./role.enum";

export type jwtPayLoad = {
    name:string;
    email:string;
    role: Role
}