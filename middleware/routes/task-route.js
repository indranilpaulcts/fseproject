module.exports = (app) => {
    const api = require('../config/api-controller');

    // Create a new task
    app.post('/add-task', api.create);

    // Retrieve all tasks
    app.get('/get-task', api.findall);

    // Update a task with name
    app.put('/upd-task/:id', api.update);
}