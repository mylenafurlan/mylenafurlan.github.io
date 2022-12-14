const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
     description: {
        type: String,
        required: true
    },
    
    imageURL: {
        type: String,
    },
});

module.exports = mongoose.model("Img", imgSchema);