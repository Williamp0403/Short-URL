import { Router } from "express"
import { ControllerAuth } from "../controllers/auth.controller.js"
import { validateData } from "../middlewares/validateData.js"
import { SchemaLogin, SchemaRegister } from "../schemas/auth.schema.js"

const route = Router()

route.post('/auth/register', validateData(SchemaRegister), ControllerAuth.register)
route.post('/auth/login', validateData(SchemaLogin), ControllerAuth.login)
route.post('/auth/logout', ControllerAuth.logout)
route.get('/auth/validate-authentication', ControllerAuth.validateAuthentication)

export default route