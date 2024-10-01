# mongoose-imei

[![Build Status](https://travis-ci.org/teslitsky/mongoose-imei.svg?branch=master)](https://travis-ci.org/teslitsky/mongoose-imei)

Gives you the `Imei` type to use in your schemas, complete with validation using [node-imei](https://www.npmjs.com/package/node-imei) library. https://en.wikipedia.org/wiki/International_Mobile_Equipment_Identity

## Usage

Start with an `npm install mongoose-imei`

```javascript
const mongoose = require('mongoose');
const imei = require('mongoose-imei');

const Schema = mongoose.Schema;

imei.loadType(mongoose);

const PhoneSchema = new Schema({
  phone: { type: Schema.Types.Imei },
});

const PhoneModel = mongoose.model('Phone', PhoneSchema);

const phone = new PhoneModel({
  imei: '351680077319519',
});
```

This type will validate the entry and return an error if a wrong value is given.
