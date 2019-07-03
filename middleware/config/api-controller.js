const Task = require('../models/task-model');
/**
 * Creates a new task
 * API: add-task - Called by the POST method
 */
exports.create = (req, res) => {
    if (!req.body){
        return res.status(400).send({message: 'Task object is empty!'});
    }
    const task = new Task({
        taskname: req.body.taskname || '',
        priority: req.body.priority || 0,
        parenttaskname: req.body.parenttaskname || '',
        startdt: req.body.startdt || '',
        enddt: req.body.enddt || '',
        running: false,
        finished: false,
        status: true
    });
    
    task.save()
    .then(data => {
        res.status(201).send(data);
    }).catch(err => {
        res.status(500).send({message: err.message || 'Error occurred during DB operation!'});
    });
}

/**
 * Fetch all tasks
 * API: get-task - Called by the GET method
 */
exports.findall = (req, res) => {
    Task.find()
    .then(task => {
        for (var i = 0; i < task.length; i++){
            if (task[i].startdt <= new Date() && task[i].enddt >= new Date()){               
                task[i].running = true;
                task[i].finished = false;
            }
            if (task[i].enddt < new Date()){
                task[i].running = false;
                task[i].finished = true;
            }
        }
        res.status(200).send(task); 
    }).catch(err => {
        res.status(500).send({message: err.message || 'Error occurred during DB operation!'});
    });
}

/**
 * Updates specific task
 * API: upd-task - Called by the PUT method
 */
exports.findo = (req, res) => {
    
}

/**
 * Updates specific task
 * API: upd-task - Called by the PUT method
 */
exports.delete = (req, res) => {
    
}