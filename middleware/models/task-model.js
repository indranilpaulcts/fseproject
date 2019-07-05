const mongoose = require('mongoose');

// Schema Tasks
const TaskSchema = mongoose.Schema({
    taskid: String,
    taskname: String,
    priority: Number,
    parentid: String,
    parenttaskname: String,
    startdt: Date,
    enddt: Date,
    status: Boolean,
    finished: Boolean,
    running: Boolean,
});

module.exports = mongoose.model('task', TaskSchema);
