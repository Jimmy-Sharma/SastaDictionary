const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema(
    {
        email: String,
        searches: String
    }
);

const Search = mongoose.model("Search", searchSchema);

module.exports = Search;