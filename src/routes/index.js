import { Router } from "express";
import consultRoutes from "./consultRoutes.js";
import userRoutes from "./userRoutes.js";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/consults", consultRoutes);

export default routes;
