const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    html_url: {
      type: String,
    },
    number: {
      type: String,
    },
    labels: {
      type: Array,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    isFav: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Issue', IssueSchema);
