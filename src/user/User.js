const mongoose = require('../config/database');

if (!Object.keys(mongoose).length) return;

const UsersSchema = mongoose.Schema(
  {
    author_name: String,
    author_email: String,
  },
  { timestamps: { createdAt: 'submit_date' } }
);

const UsersModel = mongoose.model('Users', UsersSchema);
module.exports = UsersModel;
