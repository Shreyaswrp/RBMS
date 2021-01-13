/*************************************************************
 *
 * Execution       : default node cmd> node user.controller.js
 * Purpose         : Define actions for various http methods
 *
 * @description    : Actions to be done when http methods are called.
 *
 * @file           : userController.js
 * @overview       : Actions of http methods
 * @module         : controller
 * @version        : 1.0
 * @since          : 16/11/2020
 *
 * **********************************************************/

const userService = require("../services/userService");
const utility = require("../utility/utility");

class UserRegistration {
  /**
   * @description controller to past request to register user to service
   * @param {object} req http request
   * @returns {object} res http response
   */
  registerUser(req, res){
    console.log(req.body);
    var responseResult = {};
    if (req.body != null || req.body != undefined) {
      //validate request
      const { error } = utility.validateUser(req.body);
      if (error) {
        responseResult.success = false;
        responseResult.message = "Could not register a user";
        return res.status(422).send(responseResult);
      }
      const userDetails = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        password: req.body.password,
      };
      userService.registerUser(userDetails, (err, result) => {
        if (err) {
          responseResult.success = false;
          responseResult.message = "Could not register a user";
          return res.status(422).send(responseResult);
        } else if (result == "user_exists") {
          responseResult.success = false;
          responseResult.message = "User already exists with this email id.";
          return res.status(404).send(responseResult);
        } else {
          responseResult.success = true;
          responseResult.data = result;
          responseResult.message = "User created successfully.";
          return res.status(201).send(responseResult);
        }
      });
    } else {
      responseResult.success = false;
      responseResult.message = "Invalid Request";
      return res.status(422).send(responseResult);
    }
  };

  /**
   * @description controller to past request to login user to service
   * @param {object} req http request
   * @returns {object} res http response
   */
  loginUser(req, res){
    var responseResult = {};
    console.log(req.body);
    if (req.body != null || req.body != undefined) {
      const loginData = {
        emailId: req.body.emailId,
        password: req.body.password,
      };
      userService.loginUser(loginData, (err, result) => {
        if (err || result == null) {
          responseResult.success = false;
          responseResult.message = "Incorrect password or email id ! login failed.";
          return res.status(422).send(responseResult);
        }else {
          responseResult.success = true;
          responseResult.data = result;
          responseResult.message = "logged in successfully.";
          return res.status(201).send(responseResult);
        }
      });
    } else {
      responseResult.success = false;
      responseResult.message = "Invalid Request";
      return res.status(422).send(responseResult);
    }
  };

}

module.exports = new UserRegistration();