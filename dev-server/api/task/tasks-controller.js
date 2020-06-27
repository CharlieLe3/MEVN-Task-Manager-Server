const User = require('../../model/user-model');
const Task = require('../../model/task-model');
const auth = require('../../services/auth-service');
const moment = require('moment');

// FIND ALL TASKS
function index(req, res) {
    Task.find({}, (error, tasks) => {
        // Temp
        console.log('Server call to all the tasks: ' + tasks);
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({ tasks: tasks });
    }).populate('author', 'username', 'user');
}

// CREATE TASK
function create(req, res) {
    const id = auth.getUserId(req);
    
    User.findById(id, (error, user) => {
        if (error && !user) {
            // Temp
            console.log('Error in find One: Create');
            return res.status(500).json();
        }
        const task = new Task(req.body.task);
        task.author = user._id;
        task.dueDate = moment(task.dueDate);

        task.save(error => {
            if (error) {
                console.log('Error in Save: Create');
                return res.status(500).json();
            }
            return res.status(201).json();
        });
    });
}

// UPDATE TASK
function update(req, res) {
    const id = auth.getUserId(req);
    User.findOne({ _id: id }, (error, user) => {
        if (error) {
            return res.status(500).json()
        }
        if (!user) {
            return res.status(404).json();
        }

        // Temp
        console.log('The req.body.task: ' + req.body.task);
        const task = new Task(req.body.task);
        // Temp 
        console.log('This is the new Task: ' + task);
        task.author = user._id;
        task.dueDate = moment(task.dueDate);
        Task.findByIdAndUpdate({ _id: task._id }, task, error => {
            if (error) {
                return res.status(500).json()
            }
            // Temp 
            console.log('The updated task ' + task);
            return res.status(204).json();
        });
    });
}

// DELETE A TASK
function remove(req, res) {
    const id = auth.getUserId(req);
    // Temp
    console.log('Delete task id: ' + id);
    console.log('Delete req: ' + req.params.id);
    Task.findOne({ _id: req.params.id }, (error, task) => {
        if (error) {
            return res.status(500).json();
        }
        if (!task) {
            return res.status(404).json();
        }
        if(task.author._id.toString() !== id) {
            return res.status(403).json({ message: 'Not allowed to delete another user\'s task'});
        }
        Task.deleteOne({ _id: req.params.id }, error => {
            if (error) {
                return res.status(500).json();
            }
        });
    });
    return res.status(204).json();
}

// GET TASK BY ID
function show(req, res) {
    Task.findOne({ _id: req.params.id }, (error, tasks) => {
        if (error) {
            return res.status(500).json();
        }
        if (!tasks) {
            return res.status(404).json();
        }
        return res.status(200).json({ task: tasks });
    });
}

module.exports = {
    index,
    create,
    update,
    remove,
    show
}