const { BASE_FILE_URL } = require("../BaseURL");
const { deleteFile } = require("../DeleteFile");
const Project = require("../Models/Project");

function getAllProjects(req, res) {
        Project.find({})
            .then((projects) => {
                projects.forEach((project) => {
                    let files = project.file;
                    if (files && files.length > 0) {
                        files.forEach((file, i) => {
                            files[i] = BASE_FILE_URL + file;
                        });
                    } else {
                        project.file = [];
                        let defaultProp = BASE_FILE_URL;
                        defaultProp += "default_project.png";
                        project.file.push(defaultProp);
                    }
                });
                res.status(200).send({ message: "Projects fetched", projects });
            })
            .catch((err) => {
                res.status(500).send({ message: "Error", err });
            });
    }

function getProject(req, res) {
        let { id } = req.params;
        console.log(id, "Project get");

        Project.findOne({ _id: id })
            .then((project) => {
                let files = project.file;
                if (files && files.length > 0) {
                    files.forEach((file, i) => {
                        files[i] = BASE_FILE_URL + file;
                    });
                } else {
                    project.file = [];
                    let defaultProp = BASE_FILE_URL;
                    defaultProp += "default_project.png";
                    project.file.push(defaultProp);
                }
                console.log(project);
                res.status(200).send({ message: "Project found", project });
            })
            .catch((err) => {
                res.status(500).send({ message: "Error", err });
            });
    }
    function deleteProject(req, res) {
        let { id } = req.params;
        Project.findOne({ _id: id })
            .then((project) => {
                project.file.forEach((p) => deleteFile(p));
            })
            .catch((err) => {});
        Project.deleteOne({ _id: id })
            .then((project) => {
                res.status(200).send({ message: "Project deleted", project });
            })
            .catch((err) => {
                res.status(500).send({ message: "Error", err });
            });
    }

    function updateProject(req, res) {
        let { id } = req.params;
        let projectData = req.body;
        var myquery = { _id: id };
        var newvalues = { $set: { ...projectData } };
        let { file } = projectData;
        if (file && file.length > 0) {
            Project.findOne({ _id: id })
                .then((project) => {
                    project.file.forEach((f) => deleteFile(f));
                })
                .catch((err) => {});
        }
        Project.findOneAndUpdate(myquery, newvalues, { new: true })
            .then((project) => {
                res.status(200).send({ message: "Project updated", project });
            })
            .catch((err) => {
                res.status(500).send({ message: "Error", err });
            });
    }

    function createProject(req, res) {
        let projectData = { ...req.body };
        console.log(projectData);

        let project = new Project({ ...projectData });

        project
            .save()
            .then((project) => {
                res.status(201).send({ message: "Project saved", project });
            })
            .catch((err) => {res.status(500).send({ message: "Error", err });
            });
    }


module.exports = {
    getAllProjects,
    createProject,
    deleteProject,
    getProject,
    updateProject
}
