/* eslint-disable no-param-reassign */
const ImeiType = require('./imei-type');

function loadType(mongoose) {
  const Imei = ImeiType(mongoose);

  mongoose.Types.Imei = String;
  mongoose.Schema.Types.Imei = Imei;

  return Imei;
}

module.exports.loadType = loadType;
