import express from "express";
import { Role } from "./role.enum";

export interface RequestWithUser extends express.Request{
    name:string;
    email:string;
    role:Role
}