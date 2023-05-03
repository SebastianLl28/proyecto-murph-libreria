import { Router } from 'express'
import { getUsers } from '../controller/api.controller'
// import { getUsers } from '../controller/api.controller'

const router = Router()

router.get('/user', getUsers)

export default router
