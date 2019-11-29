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

/* eslint-disable no-unused-vars */

// This is a promise to make an HTTP PATCH request to the /v2/entities end point
function upsertAttribute(device, refid, attrib) {
  return new Promise((resolve, reject) => {
    const payload = {};

    payload[attrib] = {
      type: device[attrib].type,
      value: device[attrib].value,
      metadata: {
        readBy: {
          type: 'Relationship',
          value: device.id
        }
      }
    };

    if (device.supportedUnits) {
      payload[attrib].metadata.unitCode = {
        type: 'Text',
        value: device.supportedUnits.value
      };
    }
    if (device[attrib].metadata && device[attrib].metadata.TimeInstant) {
      payload[attrib].metadata.observedAt = device[attrib].metadata.TimeInstant;
    }

    const options = {
      method: 'PATCH',
      url: CONTEXT_BROKER + device[refid].value + '/attrs',
      headers: {
        'Content-Type': 'application/json',
        'fiware-servicepath': '/',
        'fiware-service': ''
      },
      body: payload,
      json: true
    };

    request(options, (error, response, body) => {
      if (error || response.statusCode !== 204) {
        options.method = 'POST';
        request(options, (error, response, body) => {
          return error ? reject(error) : resolve();
        });
      }
      return error ? reject(error) : resolve();
    });
  });
}

router.post('/:attrib', (req, res) => {
  const attrib = req.params.attrib;

  async function updateLinkedEntity(device, index) {
    debug('notify' + JSON.stringify(device));

    if (device[attrib]) {
      await upsertAttribute(device, 'refStore', attrib);
    }
  }

  req.body.data.forEach(updateLinkedEntity);
  res.status(204).send();
});

module.exports = router;
