"use strict";

const Task = use("App/Models/Task");
const Project = use("App/Models/Project");

const AuthorizationService = use("App/Services/AuthorizationService");

class TaskController {
  async index({ auth, params }) {
    const user = await auth.getUser();
    const { id } = params;
    const project = await Project.find(id);
    AuthorizationService.verifyPermission(project, user);
    return await project.tasks().fetch();
  }

  async create({ auth, params, request }) {
    const user = await auth.getUser();
    const { description } = request.all();
    const { id } = params;
    const project = await Project.find(id);
    AuthorizationService.verifyPermission(project, user);
    const task = new Task();
    task.fill({
      description,
    });
    await project.tasks().save(task);
    return task;
  }

  async destroy({ auth, params }) {
    const user = await auth.getUser();
    const { id } = params;
    const task = await Task.find(id);
    const project = await task.project().fetch();
    AuthorizationService.verifyPermission(project, user);
    await task.delete();
    return task;
  }

  async update({ auth, params, request }) {
    const user = await auth.getUser();
    const { id } = params;
    const task = await Task.find(id);
    const project = await task.project().fetch();
    AuthorizationService.verifyPermission(project, user);
    task.merge(request.only(["description", "isCompleted"]));
    await task.save();
    return task;
  }
}

module.exports = TaskController;
