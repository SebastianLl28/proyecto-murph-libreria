import { Router } from 'express'
import { confirmationAccount, formChangePassword, formChangePasswordPost, formLogin, formLoginPost, formRecoverPassword, formRecoverPasswordPost, formRegister, formRegisterPost } from '../controller/auth.controller'
import { validationRegister } from '../middleware/register.middleware'
import validationChangedPassword from '../middleware/changepassword.middleware'
import validationLogin from '../middleware/login.middleware'
// import verifyToken from '../middleware/verifyToken.middleware'

const router = Router()

router.get('/login', formLogin)
router.post('/login', validationLogin, formLoginPost)
router.get('/register', formRegister)
router.post('/register', validationRegister, formRegisterPost)
router.get('/recover-password', formRecoverPassword)
router.post('/recover-password', formRecoverPasswordPost)

router.get('/confirmationAccount/:token', confirmationAccount)
router.get('/changePassword/:token', formChangePassword)
router.post('/changePassword/:token', validationChangedPassword, formChangePasswordPost)

export default router
