const { Router } =require( "express");
const { renderTaskForm, createTask, renderTask, renderEditForm, updateTask, deleteTask } =require( "../controllers/task.controller");
const { isAuthenticated }= require( "../helpers/auth");

const router = Router();

// New Task
router.get("/task/add", isAuthenticated, renderTaskForm);

router.post("/task/new-task", isAuthenticated, createTask);

// Get All Tasks
router.get("/tasks", isAuthenticated, renderTask);

// Edit Task
router.get("/task/edit/:id", isAuthenticated, renderEditForm);

router.put("/task/edit-task/:id", isAuthenticated, updateTask);

// Delete Task
router.delete("/task/delete/:id", isAuthenticated, deleteTask);

module.exports= router;
