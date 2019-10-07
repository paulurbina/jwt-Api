import { Router } from 'express'

const router: Router = Router()
import  { signup, signin, profile } from '../controllers/auth.controller'
import { tokenValidation } from '../libs/validateToken'

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/profile', tokenValidation, profile)

export default router