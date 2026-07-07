const express = require('express');
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('../utils/taskStore');

const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
  const tasks = await getAllTasks();
  res.json(tasks);
});

// Get one task
router.get('/:id', async (req, res) => {
  const task = await getTaskById(req.params.id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
});

// Create task
router.post('/', async (req, res) => {
  const newTask = await createTask(req.body.title);
  return res.status(201).json(newTask);
});

// Update task
router.put('/:id', async (req, res) => {
  try {
    const task = await updateTask(req.params.id, {
      title: req.body.title,
      completed: req.body.completed
    });
    res.json(task);
  } catch (err) {
    return res.status(404).json({ message: 'Task not found' });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    await deleteTask(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    return res.status(404).json({ message: 'Task not found' });
  }
});

module.exports = router;