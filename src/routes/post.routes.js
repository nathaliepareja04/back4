import { Router } from 'express'
import postCtrl from '../controllers/post.controller.js'
import { upload } from '../middleware/imgUpload.js'
import { body } from 'express-validator'
import { validFields } from '../middleware/ValidFields.js'
import { verifyToken } from '../middleware/auth.js'


const route=Router()

route.get('/',verifyToken,postCtrl.listar)
route.get('/user',verifyToken,postCtrl.listarPostLogin)
route.get('/:id',verifyToken,postCtrl.listOne)

route.post('/',verifyToken,[

    body("title","el campo title es obligatorio").optional({checkFalsy:true})
    .notEmpty(),

    body("description","el campo description es obligatorio").optional({checkFalsy:true})
    .notEmpty(),

] ,validFields,upload.single("img"),postCtrl.add)

route.delete('/:id',verifyToken,postCtrl.delete)

route.put('/:id',verifyToken,upload.single("img") ,postCtrl.update)

export default route