const IMEI = require('node-imei');

const imei = new IMEI();

function imeiType(mongoose) {
  const Parent = mongoose.SchemaTypes.String;

  function Imei(path, options) {
    Parent.call(this, path, options);

    function validateImei(value) {
      return imei.isValid(value);
    }

    this.validate(validateImei, 'IMEI is invalid');
  }

  Imei.prototype = Object.create(mongoose.SchemaType.prototype);

  Imei.prototype.cast = function cast(value) {
    return value;
  };

  return Imei;
}

module.exports = imeiType;
