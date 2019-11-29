const express = require('express');
const router = express.Router();
const debug = require('debug')('listener:subscription');
const request = require('request');

const CONTEXT_BROKER =
  'http://' +
  (process.env.LISTENER_PORT_CB_HOST || 'localhost') +
  ':' +
  (process.env.LISTENER_PORT_CB_PORT || '1026') +
  '/v2/entities/';


router.post('/:attrib', (req, res) => {
  const attrib = req.params.attrib;

  async function updateLinkedEntity(device, index) {
    debug('notify' + JSON.stringify(device));
  }

  req.body.data.forEach(updateLinkedEntity);
  res.status(204).send();
});

module.exports = router;
