const utility = require("../utility/utility");
const userModel = require("../app/models/userModel");

class UserService {
  /**
   * @params {object} data
   * @returns {callback function} callback
   * @description register a new user in the database
   */
  registerUser(data, callback){
    var userDetails = {
      firstName: data.firstName,
      lastName: data.lastName,
      emailId: data.emailId,
      password: utility.hashPassword(data),
    };
    userModel.findUser(userDetails, (err, result) => {
      if (err) {
        return callback(err, null);
      } else if (result != null) {
        return callback(null, "user_exists");
      } else {
        return userModel.createUser(userDetails, callback);
      }
    });
  };

  /**
   * @params {object} data
   * @returns {callback function} callback
   * @description let a user login by providing correct id and password
   */
  loginUser(data, callback){
    userModel.findUser(data, (err, result) => {
      if (err || result == null) {
        return callback(err, null);
      } else {
          const res = utility.comparePasswords(data.password, result.password);
          if (res) {
            const token = utility.generateToken(result._id);
            return callback(null, token);
          } else {
            return callback(err, null);
          }
      }
    });
  };
}

module.exports = new UserService();
