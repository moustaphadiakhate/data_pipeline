const { query } = require('express-validator');

export const Client = [
  query('client_email').isEmail(),
]
