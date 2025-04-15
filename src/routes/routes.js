import { Router } from "express"
import { getResult, PatchMeasure} from "../controllers/imageController.js"
import { schemaValidation } from "../middlewares/schemaValidation.js"
import { bodyUpload , bodyPatch} from "../schemas/bodySchema.js"
import { GetList } from "../controllers/customerController.js"
const routes = Router()
routes.post("/upload",schemaValidation(bodyUpload),getResult)
routes.patch("/confirm",schemaValidation(bodyPatch),PatchMeasure)
routes.get("/:customer_code/list",GetList)
export default routes