const prisma = require('../config/prisma');

async function getAllTasks() {
  return prisma.task.findMany();
}

async function getTaskById(id) {
  return prisma.task.findUnique({ where: { id } });
}

async function createTask(title) {
  return prisma.task.create({
    data: { title, completed: false }
  });
}

async function updateTask(id, data) {
  return prisma.task.update({
    where: { id },
    data
  });
}

async function deleteTask(id) {
  return prisma.task.delete({ where: { id } });
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};