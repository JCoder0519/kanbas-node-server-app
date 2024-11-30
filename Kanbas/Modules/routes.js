import * as modulesDao from "./dao.js";

export default function ModuleRoutes(app) {
    app.put("/api/modules/:moduleId", async (req, res) => {
        const { moduleId } = req.params;
        const moduleUpdates = req.body;
        delete moduleUpdates._id
        const updatedModule = await modulesDao.updateModule(moduleId, moduleUpdates);
        res.status(204).send(updatedModule)
    });

    app.delete("/api/modules/:moduleId", async (req, res) => {
        const { moduleId } = req.params;
        await modulesDao.deleteModule(moduleId);
        res.sendStatus(204);
    });

    app.post("/api/courses/:courseId/modules", async (req, res) => {
        const { courseId } = req.params;
        const module = {
          ...req.body,
          course: courseId,
        };
        const newModule = await modulesDao.createModule(module);
        res.send(newModule);
    });
     

}