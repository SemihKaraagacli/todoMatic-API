import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const todoGetAll = async (req, res) => {
    try {
        const todoGetAll = await prisma.task.findMany()
        return res.status(200).json({
            success: true,
            data: todoGetAll
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Kayıtlar getirlemedi!"
        })
    }
}

export const todoAdd = async (req, res) => {

    const findTask = await prisma.task.findUnique(
        {
            where: {
                name: req.body.name
            }
        }
    )

    if (findTask) {
        return res.status(400).json({
            success: false,
            message: "isim zaten alınmış, lütfen başka bir isim"
        })
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
        return res.status(200).json({
            success: true,
            data: taskAdd,
            message: "Basarıyla oluşturuldu"

        })

    } else {
        return res.status(500).json({
            success: false,
            message: "Kayıt Oluşturulamadı."
        })
    }
};
export const todoShowTask = async (req, res) => {
    const todoId = req.params.id
    const todoShowTask = await prisma.task.findFirst({
        where: {
            id: Number(todoId)
        }
    })
    return res.status(200).json({
        success: true,
        data: todoShowTask,
        message: `Id'si ${todoId} olan kayıt gösterildi`
    })
}

export const todoUpdate = async (req, res) => {
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
        return res.status(200).json({
            success: true,
            data: todoUpdate,
            message: "Basarıyla güncellendi."
        })
    } else {
        return res.status(400).json({
            success: false,
            message: "güncelleme yapılamadı."
        })
    }
}