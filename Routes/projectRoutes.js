const { getAllProjects, getProject, createProject, updateProject, deleteProject } = require("../Controller/projectController");
const projectRouter = require("express").Router();
const upload = require("../Middlewares/middlewares");
const { verifyAdmin, verifyToken } = require("../Middlewares/middlewares");

projectRouter.get("/", verifyToken, getAllProjects);
projectRouter.get("/:id", verifyToken, getProject);
projectRouter.post("/", verifyToken, verifyAdmin, upload, createProject);
projectRouter.delete("/:id", verifyToken, verifyAdmin, deleteProject);
projectRouter.patch("/:id", verifyToken, verifyAdmin, upload, updateProject);

module.exports = projectRouter;
