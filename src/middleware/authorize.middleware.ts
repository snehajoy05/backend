import  express from "express";
import { RequestWithUser } from "../utils/requestwithUser";
import { Role } from "../utils/role.enum";
import HttpException from "../exception/http.exception";

const authorize = function (roles:Role[]){
    return async (req:RequestWithUser,res:express.Response,next:express.NextFunction)=>{
    try{
const role = req.role;
if(roles.indexOf(role)==-1){
    throw new HttpException(403,"you are not authorized for this ")
}next();
    }
    catch(error){
        next(error);
    }
}
}
export default authorize;