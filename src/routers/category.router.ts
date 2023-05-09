import { Router } from 'express'
import { addcategoryPost, categoryNotFound, categorySearchGet, deleteCategoryPost, editCategoryGet, editCategoryPost } from '../controller/category.controller'
import verifyToken from '../middleware/verifyToken.middleware'
import { checkCategoryEditName, verifyNameCategory } from '../middleware/category.middleware'

const router = Router()

router.post('/add', verifyToken, verifyNameCategory, addcategoryPost)

router.get('/edit/:id', verifyToken, editCategoryGet)

router.post('/edit/:id', verifyToken, checkCategoryEditName, editCategoryPost)

router.post('/delete/:id', verifyToken, deleteCategoryPost)

router.post('/search', categorySearchGet)

router.get('/**/*', verifyToken, categoryNotFound)

export default router
