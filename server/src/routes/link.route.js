import { Router } from "express";
import { ControllerLink } from "../controllers/link.controller.js";
import { validateSession } from "../middlewares/validateSession.js";
import { attachUserIfPresent } from "../middlewares/attachUserIfPresent.js";
import { validateData } from "../middlewares/validateData.js";
import { SchemaLink } from "../schemas/link.schema.js";

const route = Router()

route.get('/links', validateSession, ControllerLink.getLinks)
route.get('/link/:id', validateSession, ControllerLink.getLinkStatistics)
route.post('/link', validateData(SchemaLink), attachUserIfPresent, ControllerLink.createLink)
route.delete('/link/:id', validateSession, ControllerLink.deleteLink)
route.get('/:code', ControllerLink.redirectLink)
route.get('/links/dashboard/summary', validateSession, ControllerLink.getDashboardSummary)
route.get('/links/dashboard/tech-summary', validateSession, ControllerLink.getDashboardTechSummary)

export default route