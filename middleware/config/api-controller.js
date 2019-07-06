const Task = require('../models/task-model');
const Parent = require('../models/parent-model');
const logger = require('../config/winston');
const mongoose = require('mongoose');

/**
 * Creates a new task
 * API: add-task - Called by the POST method
 */
exports.create = (req, res) => {
    if (!req.body) {
        logger.error(`500: Task object is empty - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(400).send({message: 'Task object is empty!'});
    }

    const parent = new Parent({
        parentid: new mongoose.Types.ObjectId(),
        parentname: req.body.parenttaskname,
    });

    const task = new Task({
        taskid: new mongoose.Types.ObjectId(),
        taskname: req.body.taskname || '',
        priority: req.body.priority || 0,
        parentid: parent.parentid || '',
        parenttaskname: parent.parentname || '',
        startdt: req.body.startdt || '',
        enddt: req.body.enddt || '',
        finished: false,
        status: true,
        running: false,
    }); 

    Parent.find({parentname: req.body.parenttaskname}, (err, docs) => {
        if (!docs.length){
            parent.save()
            .then(data => {
                logger.info(`201: New Parent Task has been added - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            }).catch(err => {
                logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                res.status(500).send({message: err.message || 'Error occurred during DB operation!'});
            });
        } else {
            task.parentid = docs[0].parentid;
            task.save()
            .then(data => {
                logger.info(`201: New Task has been added - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                res.status(201).send(data);
            }).catch(err => {
                logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                res.status(500).send({message: err.message || 'Error occurred during DB operation!'});
            });
        }
    });
}

/**
 * Fetch all tasks
 * API: get-task - Called by the GET method
 */

exports.findall = (req, res) => {   
    Task.find()
    .then(task => {
        for (var i = 0; i < task.length; i++) {
            if (task[i].startdt <= new Date() && task[i].enddt >= new Date()) { 
                task[i].running = true;              
                task[i].finished = false;
            }
            if (task[i].enddt < new Date()) {
                task[i].running = false;
                task[i].finished = true;
            } 
            
            Task.findByIdAndUpdate(task[i].__id, task, (err, task) => {
                if(err){
                    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                }
            });
        }
        logger.info(`200: All records have been fetched - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(200).send(task); 
    }).catch(err => {
        logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send({message: err.message || 'Error occurred during DB operation!'});
    });
}

/**
 * Fetch all parents 
 * API: get-parent/ - Called by the GET method
 */
exports.findparent = (req, res) => {
    Parent.find()
    .then(parent => {
        logger.info(`200: All parents have been fetched - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(200).send(parent); 
    }).catch(err => {
        logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send({message: err.message || 'Error occurred during DB operation!'});
    });
}

/**
 * Fetch specific tasks based on params id
 * API: get-task/:id - Called by the GET method
 */
exports.find = (req, res) => {
    Task.findById(req.params.id)
    .then(task => {
        if (!task) {
            logger.info(`404: TaskID ${req.params.id} not found - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(404).send({message: 'Task not found!'}); 
        }
        logger.info(`200: TaskID ${req.params.id} has been fetched - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(200).send(task); 
    }).catch(err => {
        logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send({message: err.message || 'Error occurred during DB operation!'});
    });
}

/**
 * Updates specific task
 * API: upd-task/:id - Called by the PUT method
 */
exports.updtask = (req, res) => {
    if (!req.body) {
        logger.error(`500: Task object is empty - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send({message: 'Task object is empty!'});
    }
    Task.findByIdAndUpdate(req.params.id, req.body, (err, task) => {
        if (err) {
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(500).send({message: err.message || 'Error occurred during DB operation!'});
        }
        Task.find()
        .then(task => {
            if (!task) {
                logger.error(`404: TaskID ${req.params.id} not found - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                res.status(404).send({message: 'Task not found!'});
            }
            logger.info(`200: TaskID ${req.params.id} has been fetched - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(200).send(task); 
        }).catch(err => {
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(500).send({message: err.message || 'Error occurred during DB operation!'});
        });
    });
}
