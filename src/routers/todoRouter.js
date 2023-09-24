import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const prisma = new PrismaClient()

export const router = Router();

router.get("/", async (req, res) => {
    const todoFetchAll = await prisma.task.findMany()
    res.render('todo/todo', { title: "deneme", items: todoFetchAll })

})

router.post("/", async (req, res) => {


    try {
        await prisma.task.findUnique(
            {
                where: {
                    name: req.body.name
                }
            }

        )

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


})
router.get("/:id", async (req, res) => {
    const todoId = req.params.id
    try {
        const todoShowTask = await prisma.task.findFirst({
            where: {
                id: Number(todoId)
            }
        })
        const statusShowTrue = res.status(200).json({
            success: true,
            data: todoShowTask,
            message: `Id'si ${todoId} olan kayıt gösterildi`
        })
        return statusShowTrue
        res.send(statusShowTrue)
    } catch (err) {
        const statusShowFalse = res.status(200).json({
            success: false,
            message: `Id'si ${todoId} olan kayıt gösterilemedi`
        })
        return statusFalse
        res.send(statusFalse)
    }
})
router.put("/:id", async (req, res) => {
    const taskId = req.params.id
    const todoUpdate = await prisma.task.update({
        where: {
            id: Number(taskId)
        },
        data: {
            name: req.body.name,
            comment: req.body.comment,
            time: req.body.time,
            complated: req.body.complated
        }
    })
    if (todoUpdate) {
        const statusUpdateTrue = res.status(200).json({
            success: true,
            data: todoUpdate,
            message: "Basarıyla güncellendi."
        })
        return statusUpdateTrue
    } else {
        const statusUpdateFalse = res.status(400).json({
            success: false,
            message: "güncelleme yapılamadı."
        })
        return statusUpdateFalse
    }
})
router.delete("/:id", async (req, res) => {
    const todoId = req.params.id
    try {
        const todoDelete = await prisma.task.delete({
            where: {
                id: Number(todoId)
            }
        })
        const statusDeleteTrue = res.status(200).json({
            success: true,
            data: todoDelete,
            message: `${todoId} numaralı kayıt başarıyla silinmiştir`
        })
        return statusDeleteTrue
    } catch (error) {
        const statusDeleteFalse = res.status(200).json({
            success: false,
            message: `${todoId} numaralı kayıt başarıyla silinemedi`
        })
        return statusDeleteFalse
    }
})