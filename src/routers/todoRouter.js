import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const prisma = new PrismaClient()

export const router = Router();

router.get("/", async (req, res) => {
    const todoFetchAll = await prisma.task.findMany()
    res.render('todoView/todo', { title: "deneme", items: todoFetchAll })

})//TodofetchAll

router.post("/", async (req, res) => {


    try {

        await prisma.task.create({
            data: {
                name: req.body.name,
                comment: req.body.comment,
                time: req.body.time,
                complated: req.body.complated
            }
        })
        res.redirect('/todo')
    } catch (error) {
        res.redirect('/todo')
    }


})//TodoAdd

router.get("/:id/show", async (req, res) => {
    const todoId = req.params.id
    const todoShowTask = await prisma.task.findFirst({
        where: {
            id: Number(todoId)
        }
    });
    res.render('todoView/todoShow', { tittle: "Todo Details", item: todoShowTask })

})//TodoShowTask

router.get("/:id/edit", async (req, res) => {
    const todoId = req.params.id
    const todoShowTask = await prisma.task.findFirst({
        where: {
            id: Number(todoId)
        }
    });
    res.render('todoView/todoUpdate', { tittle: "Todo Details", item: todoShowTask })

})//TodoShowTask

router.post("/:id/edit", async (req, res) => {

    const taskId1 = req.params.id
    console.log(taskId1);

    await prisma.task.update({
        where: {
            id: Number(taskId1)
        },
        data: {
            name: req.body.name,
            comment: req.body.comment,
            time: req.body.time,
            complated: req.body.complated
        }
    })
    res.redirect('/todo')

})//TodoUpdate

router.get("/:id", async (req, res) => {
    const todoId = req.params.id
    console.log(todoId);
    await prisma.task.delete({
        where: {
            id: Number(todoId)
        }
    })
    res.redirect('/todo')
})//TodoDelete