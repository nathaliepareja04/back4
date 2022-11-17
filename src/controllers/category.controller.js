import { response } from "../helpers/Response.js";
import { categoryModel } from "../models/category.model.js";
import { postModel } from "../models/post.model.js";

const categoryCtrl={}

categoryCtrl.listar=async(req,res)=>{
    try {
        const categorias=await categoryModel.find()
        response(res,200,true,categorias,"lista de categorias")
        
    } catch (error) {
        response(res,500,false,"",error.message)
    }
}

categoryCtrl.crear=async(req,res)=>{
    try {
        const nuevaCategoria=await categoryModel.create(req.body)
        response(res,201,true,nuevaCategoria,"categoria creada")
    } catch (error) {
        response(res,500,false,"",error.message)
    }
}


categoryCtrl.listarPorId=async(req,res)=>{
    try {
        const {id}=req.params
        const categoria=await categoryModel.findById(id)
        if(!categoria){
            return response(res,404,false,"","categoria no encontrada")
        }
        response(res,200,true,categoria,"categoria encontrada")
    } catch (error) {
        response(res,500,false,"",error.message)
    }
}


categoryCtrl.eliminar=async(req,res)=>{
    try {
        const {id}=req.params
        const categoria=await categoryModel.findById(id)
        if(!categoria){
            return response(res,404,false,"","categoria no encontrada")
        }

        await categoria.deleteOne()
        response(res,200,true,"","categoria eliminada")
    } catch (error) {
        response(res,500,false,"",error.message)
    }
}


categoryCtrl.actualizar=async(req,res)=>{
    try {
        const {id}=req.params
        const categoria=await categoryModel.findById(id)
        if(!categoria){
            return response(res,404,false,"","categoria no encontrada")
        }
        await categoria.updateOne(req.body)
        response(res,200,true,"","categoria actualizada")
    } catch (error) {
        response(res,500,false,"",error.message)
    }
}

export default categoryCtrl