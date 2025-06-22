const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const { signup,login } = require('../Controllers/AuthController');
// This code imports the signup validation middleware and the signup controller function.
   

const router = require('express').Router();

router.post('/login', loginValidation, login)

router.post('/signup', signupValidation, signup)

module.exports = router;
// This code defines the authentication routes for login and signup.