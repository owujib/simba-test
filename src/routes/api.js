var express = require('express');
const AuthController = require('../controller/Auth/AuthController');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.status(200).json({
    status: 'sucess',
    message: 'I want to be your favorite hello and hardest goodbye 🤗',
  });
});

/**@routes auth routes */
router.post('/user/register', AuthController.create);

module.exports = router;
