var express = require('express');
var router = express.Router();
const dataService = require('../services/data.service');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.json([]);
});

router.get('/getTodos', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  dataService.getTodos()
  .then(todos => {
      res.json(todos);
  })
 
});

router.post('/', function(req, res, next) {
  const result = dataService.createTodo(req.body);
  // res.render('index', { title: 'Express' });
  res.status(result.statusCode).json(result);
});



module.exports = router;
