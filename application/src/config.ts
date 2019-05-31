// TODO: Is this the best way to handle top level config data?

import dotenv = require('dotenv');
dotenv.configure();

export const SECRET = process.env.SECRET_KEY || 'test';

