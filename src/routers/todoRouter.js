import { Router } from 'express';
import { todoAdd, todoGetAll, todoUpdate, todoShowTask } from '../controllers/todoAppController.js';

export const router = Router();
router.get("/todo", todoGetAll)
router.post("/todo", todoAdd)
router.get("/todo/:id", todoShowTask)
router.put("/todo/:id", todoUpdate)
