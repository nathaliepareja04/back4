import express from 'express';
import formData  from 'express-form-data';
import cors from 'cors';
import morgan from 'morgan';
import { connectDb } from './database.js';
import {dirname} from "path"
import { fileURLToPath } from "url";

//rutas
import postRoutes from "./routes/post.routes.js"
import categoryRoutes from "./routes/category.routes.js"
import userRoutes from "./routes/user.routes.js"

connectDb()

const __filename=fileURLToPath(import.meta.url)
const __dirname=dirname(__filename)

const app= express();

app.set('Port',4000);

app.use("/public",express.static(__dirname+"/storage/imgs"))

app.use(morgan('dev'));
app.use(cors({origin:'*'}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// app.use(formData.parse())

app.use("/post",postRoutes)
app.use("/category",categoryRoutes)
app.use("/user",userRoutes)

app.listen(app.get('Port'),()=>{console.log('servidor escuchando por el puerto', app.get('Port'))})