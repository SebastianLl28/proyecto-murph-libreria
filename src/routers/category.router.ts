import { Router } from 'express'
import { addcategoryPost, categoryNotFound, deleteCategoryPost, editCategoryGet, editCategoryPost } from '../controller/category.controller'
import verifyToken from '../middleware/verifyToken.middleware'
import { checkCategoryEditName, verifyNameCategory } from '../middleware/category.middleware'

const router = Router()

router.post('/add', verifyToken, verifyNameCategory, addcategoryPost)

router.get('/edit/:id', verifyToken, editCategoryGet)

router.post('/edit/:id', verifyToken, checkCategoryEditName, editCategoryPost)

router.post('/delete/:id', verifyToken, deleteCategoryPost)

router.get('/**/*', verifyToken, categoryNotFound)

export default router
