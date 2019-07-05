module.exports = (app) => {
    const api = require('../config/api-controller');

    // Create a new task
    app.post('/add-task', api.create);

    // Retrieve all tasks
    app.get('/get-task', api.findall);

    // Retrieve specific task with id
    app.get('/get-task/:id', api.find);

    // Retrieve all parents
    app.get('/get-parent', api.findparent);

    // Update a task with id
    app.put('/upd-task/:id', api.updtask);
}