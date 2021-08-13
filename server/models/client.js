const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  clientName: {
    type: String,
    unique: true,
  },
  activities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Activities'
    }
  ]
});

module.exports = mongoose.model("Client", clientSchema);