import { Router } from 'express'
import { formLogin } from '../controller/usuario.controller'

const router = Router()

router.get('/login', formLogin)

export default router
