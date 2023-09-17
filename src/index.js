import express from 'express'
import { router } from './routers/todoRouter.js'

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/todo", router);


app.listen(3000, () =>
    console.log('>>>> http://localhost:3000/todo <<<<'),
)
