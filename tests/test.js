const { test } = require('ava');
const mongoose = require('mongoose');
const { Mockgoose } = require('mockgoose');
const ImeiModule = require('../index.js');

const mockgoose = new Mockgoose(mongoose);

ImeiModule.loadType(mongoose);
const { Schema } = mongoose;

const { Imei } = Schema.Types;
const SampleSchema = new Schema({ imei: { type: Imei } });
const SampleModel = mongoose.model('Sample', SampleSchema);

test.before(async () => {
  await mockgoose.prepareStorage();
  await mongoose.connect('mongodb://localhost/test');
});

test('loadType() function exists', t => {
  t.is(typeof ImeiModule.loadType, 'function');
});

test('mongoose.Schema.Types now has an "Imei" type', t => {
  t.is(Object.prototype.hasOwnProperty.call(Schema.Types, 'Imei'), true);
});

test('throws an error when given invalid IMEI', async t => {
  const Model = new SampleModel({ imei: '123' });
  const error = await t.throws(Model.save());
  t.is(error.errors.imei.name, 'ValidatorError');
  t.is(error.errors.imei.message, 'IMEI is invalid');
});

test('stores the proper IMEI value without any validation errors', async t => {
  const imei = '351680077319519';
  const Model = new SampleModel({ imei });
  const result = await Model.save();
  t.is(result.imei, imei);
});

test.after('cleanup', async () => {
  await mongoose.disconnect();
});
