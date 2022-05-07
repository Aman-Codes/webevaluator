const mongoose = require("mongoose");

const CookieSchema = new mongoose.Schema({
  cookie_name: {
    type: String,
  },
  placed_by: {
    type: String,
  },
  functionality: {
    type: String,
  },
  purpose: {
    type: String,
  },
});

module.exports = mongoose.model("cookie", CookieSchema);
