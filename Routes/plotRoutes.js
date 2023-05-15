const { getAllPlots, getPlot, createPlot, updatePlot, deletePlot } = require("../Controller/plotController");
const plotRouter = require("express").Router();
const upload = require("../Middlewares/middlewares");
const { verifyAdmin, verifyToken } = require("../Middlewares/middlewares");

plotRouter.get("/", verifyToken, getAllPlots);
plotRouter.get("/:id", verifyToken, getPlot);
plotRouter.post("/", verifyToken, verifyAdmin, upload, createPlot);
plotRouter.delete("/:id", verifyToken, verifyAdmin, deletePlot);
plotRouter.patch("/:id", verifyToken, verifyAdmin, upload, updatePlot);

module.exports = plotRouter;
