import jwt from "jsonwebtoken";
import { response } from "../helpers/Response.js";
import { userModel } from "../models/user.model.js";

const messageNoAuth=(res)=>{
    return response(res,401,false,"","no estás autorizado")
}

export const verifyToken=async(req,res,next)=>{
    let token=null
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        // console.log("ingrese")
        token=req.headers.authorization.split(" ")[1]

        jwt.verify(token, "abc123", async (err,payload)=>{
            if(err){
                return messageNoAuth(res)
            }
            // console.log(payload)
            const user=await userModel.findById({_id:payload.user})
            if(!user){
                return messageNoAuth(res)
            }
            
            req.userId=payload.user

            next()
        })
    }
    if(!token){
        return messageNoAuth(res)
    }
}