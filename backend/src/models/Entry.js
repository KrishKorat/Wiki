const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema(
    {
        title: {type: String, requiref: true, unique: true},
        content: {type: String, required: true}
    }, 
    { timestamps: true }
);

module.exports = mongoose.model("Entry", EntrySchema);