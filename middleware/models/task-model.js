const mongoose = require('mongoose');

// Schema Tasks
const TaskSchema = mongoose.Schema({
    taskname: String,
    priority: Number,
    parenttaskname: String,
    startdt: Date,
    enddt: Date,
    status: Boolean,
    finished: Boolean,
    running: Boolean
});

module.exports = mongoose.model('task', TaskSchema);