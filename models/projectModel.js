const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    projectLink: { type: String, required: true },
    tags: [String],
});
module.exports = mongoose.model('Project', projectSchema);