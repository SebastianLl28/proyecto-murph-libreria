import { Router } from 'express'
import { addcategoryPost } from '../controller/category.controller'

const router = Router()

router.post('/add', addcategoryPost)

export default router
