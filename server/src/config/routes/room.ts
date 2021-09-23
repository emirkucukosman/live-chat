import { Router } from "express";
import * as Controller from "../../controllers/room";

const router = Router();

router.route("/").get(Controller.getAllRooms);
router.route("/:name").get(Controller.getOneByName);
router.route("/").post(Controller.createRoom);

export default router;
