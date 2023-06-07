require('dotenv').config();

const PORT        = process.env.PORT || 3000;
const TYPE_DB     = process.env.SWITCH_TYPEDB || 'undefined';
const DB          = process.env.SWITCH_DB || 'text';
const TYPE_FORMAT = process.env.SWITCH_TYPEFORMAT || 'undefined';

module.exports = { PORT, TYPE_DB, DB, TYPE_FORMAT }