import { Router } from 'express'
import { check } from 'express-validator'
import categoryCtrl from '../controllers/category.controller.js'
import { validFields } from '../middleware/ValidFields.js'


const route=Router()

route.get('/',categoryCtrl.listar)
route.get('/:id',categoryCtrl.listarPorId)

route.post('/',[
    check("nombre","el campo nombre es obligatorio")
    .notEmpty()
    ],
    validFields,
    categoryCtrl.crear
)

route.delete('/:id',categoryCtrl.eliminar)

route.put('/:id',categoryCtrl.actualizar)

export default route