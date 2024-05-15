let tasks = [ {
    "id": 11,
    "title": "Write a to-do",
    "description": "Personal Projects",
    "status": "pending",
  },
  {
    "id": 12,
    "title": "Hitting the gym",
    "description": "Chest workout",
    "status": "pending",
  },
  {
    "id": 13,
    "title": "Going to sleep",
    "description": "To have tight sleep",
    "status": "pending",
  }];

exports.getTasks = (req, res) => {
    res.json(tasks);
};

exports.createTask = (req, res) => {
    const { title, description } = req.body;
    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        status: 'pending'
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
};

exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
    if (taskIndex !== -1) {
        tasks[taskIndex] = {
            ...tasks[taskIndex],
            title: title || tasks[taskIndex].title,
            description: description || tasks[taskIndex].description,
            status: status || tasks[taskIndex].status
        };
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
};

exports.deleteTask = (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.sendStatus(204);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
};
