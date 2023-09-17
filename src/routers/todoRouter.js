import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
// import { todoAdd, todoGetAll, todoUpdate, todoShowTask, todoDelete } from '../controllers/todoAppController.js';

const prisma = new PrismaClient()

export const router = Router();

router.get("/", async (req, res) => {

    try {
        const todoFetchAll = await prisma.task.findMany()
        const statusTrue = res.status(200).json({
            succes: true,
            message: "Tüm veri başarıyla görüntülendi.",
            data: todoFetchAll
        })
        return statusTrue
        res.send(statusTrue)
    } catch (error) {
        const statusFalse = res.status(500).json({
            succes: false,
            message: "Veriler Görüntülenemedi." + error,
        })
        return statusFalse
        res.send(statusFalse)
    }

})
router.post("/", async (req, res) => {
    const findTask = await prisma.task.findUnique(
        {
            where: {
                name: req.body.name
            }
        }
    )

    if (findTask) {
        const statusTrue = res.status(400).json({
            success: false,
            message: "isim zaten alınmış, lütfen başka bir isim"
        })
        return statusTrue
        res.send(statusTrue)
    }

    const taskAdd = await prisma.task.create({
        data: {
            name: req.body.name,
            comment: req.body.comment,
            time: req.body.time,
            complated: req.body.complated
        }
    })

    if (taskAdd) {
        ;
        const statusTrue = res.status(200).json({
            success: true,
            data: taskAdd,
            message: "Basarıyla oluşturuldu"

        })
        return statusTrue
        res.send(statusTrue)

    } else {
        const statusFalse = res.status(500).json({
            success: false,
            message: "Kayıt Oluşturulamadı."
        })
        return statusFalse
        res.send(statusFalse)
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