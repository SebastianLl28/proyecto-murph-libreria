import { Router } from 'express'
import { addcategoryPost, categoryNotFound, editCategoryGet, editCategoryPost } from '../controller/category.controller'
import verifyToken from '../middleware/verifyToken.middleware'
import { checkCategoryEditName, verifyNameCategory } from '../middleware/category.middleware'

const router = Router()

router.post('/add', verifyToken, verifyNameCategory, addcategoryPost)

router.get('/edit/:id', editCategoryGet)

router.post('/edit/:id', checkCategoryEditName, editCategoryPost)

router.get('/**/*', categoryNotFound)

export default router
