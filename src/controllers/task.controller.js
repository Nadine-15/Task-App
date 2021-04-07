const Task =require( "../models/Task");


module.exports={

  renderTaskForm :(req, res) => {
    res.render("tasks/new-task");
  },

  createTask : async (req, res) => {

    const { title, description } = req.body;
    const errors = [];
    if (!title) {
      errors.push({ text: "Please Write a Title." });
    }
    if (!description) {
      errors.push({ text: "Please Write a Description" });
    }
    if (errors.length > 0) {
      res.render("tasks/new-task", {
        errors,
        title,
        description,
      });
    } else {
      const newTask = new Task({ title, description });
      newTask.user = req.user.id;
      await newTask.save();
      req.flash("success_msg", "Task Added Successfully");
      res.redirect("/tasks");
    }
  },

  renderTask : async (req, res) => {

    const tasks = await Task.find({ user: req.user.id })

      .sort({ date: "desc" })
      .lean();
      
    res.render("tasks/all-tasks", { tasks });



  },

  renderEditForm : async (req, res) => {

    const task = await Task.findById(req.params.id).lean();
    if (task.user != req.user.id) {
      req.flash("error_msg", "Not Authorized");
      return res.redirect("/tasks");
    }
    res.render("tasks/edit-task", { task });

  },

  updateTask :async (req, res) => {
    const { title, description } = req.body;
    await Task.findByIdAndUpdate(req.params.id, { title, description });
    req.flash("success_msg", "Task Updated Successfully");
    res.redirect("/tasks");
  },
  
  deleteTask : async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Task Deleted Successfully");
    res.redirect("/tasks");
  }
  
}


