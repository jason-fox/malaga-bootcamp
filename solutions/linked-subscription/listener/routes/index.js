const express = require('express');
const router = express.Router();

const debug = require('debug')('listener:index');

/* eslint-disable no-unused-vars */

/* GET home page. */
router.get('/', function(req, res, next) {
  debug('Listening');
  res.setHeader('Content-Type', 'application/json');
  res.send({ title: 'Express' });
});

module.exports = router;
