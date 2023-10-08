import express from 'express'
import { router } from './src/routers/todoRouter.js'
import path from 'path'
import { fileURLToPath } from 'url'
const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use("/todo", router);
app.set('view engine', 'ejs')


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname, 'public')))


app.listen(3000, () =>
    console.log(`>>>> http://localhost:${port}/todo portundan başladı. <<<<`),
)
