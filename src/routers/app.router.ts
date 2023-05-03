import { Router } from 'express'
import { category, customers, dashboard, product, profile, signOff, supplier, users } from '../controller/app.controller'
import verifyToken from '../middleware/verifyToken.middleware'

const router = Router()

router.get('/dashboard', verifyToken, dashboard)

router.get('/profile', verifyToken, profile)

router.get('/category', verifyToken, category)

router.get('/customers', verifyToken, customers)

router.get('/users', verifyToken, users)

router.get('/product', verifyToken, product)

router.get('/supplier', verifyToken, supplier)

router.post('/signOff', verifyToken, signOff)

export default router
