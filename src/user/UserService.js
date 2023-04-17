const User = require('./User');

module.exports = {
  createUser: async (userData) => {
    const userObj = await User.findOne({ author_email: userData.author_email });
    if (userObj) {
      return userObj;
    }
    let newUser = new User(userData);
    return await newUser.save();
  },

  getAllUsers: () => {
    return User.find({});
  },
};
