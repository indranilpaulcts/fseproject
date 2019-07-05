const mongoose = require('mongoose');

// Schema Tasks
const ParentSchema = mongoose.Schema({
    parentid: String,
    parentname: String,
});

module.exports = mongoose.model('parent', ParentSchema);