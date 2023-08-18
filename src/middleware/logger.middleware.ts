import { NextFunction, Request, Response } from "express"

const loggerMiddleware=(req:Request,res: Response ,next: NextFunction)=>{
    console.log(`${new Date()}:${req.url}:${req.method}`);
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next();
}

export default loggerMiddleware;