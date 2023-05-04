import { Router } from 'express'
import { addcategoryPost } from '../controller/category.controller'
import verifyToken from '../middleware/verifyToken.middleware'
import { verifyNameCategory } from '../middleware/category.middleware'

const router = Router()

router.post('/add', verifyToken, verifyNameCategory, addcategoryPost)

export default router
