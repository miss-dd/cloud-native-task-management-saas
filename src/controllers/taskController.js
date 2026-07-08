const taskService = require('../services/taskService');

async function getAllTasks(req, res) {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
}

async function getTaskById(req, res) {
  const task = await taskService.getTaskById(req.params.id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
}

async function createTask(req, res) {
  const newTask = await taskService.createTask(req.body.title);
  res.status(201).json(newTask);
}

async function updateTask(req, res) {
  try {
    const task = await taskService.updateTask(req.params.id, {
      title: req.body.title,
      completed: req.body.completed
    });
    res.json(task);
  } catch (err) {
    res.status(404).json({ message: 'Task not found' });
  }
}

async function deleteTask(req, res) {
  try {
    await taskService.deleteTask(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(404).json({ message: 'Task not found' });
  }
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};