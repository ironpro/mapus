const mongoose = require("mongoose");

const activitySchema = mongoose.Schema({
    desc: { type : String }, 
    created: {type: Date, default: Date.now},
    tags: [{ type : String }]
})

module.exports = mongoose.model("Activities", activitySchema);
