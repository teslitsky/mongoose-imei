const assert = require('node:assert');
const { after, before, describe, it } = require('node:test');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const ImeiModule = require('../index');

const { Schema } = mongoose;

let mongod;
let SampleModel;

describe('Mongoose IMEI', () => {
  before(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    await mongoose.connect(uri);

    ImeiModule.loadType(mongoose);

    const { Imei } = Schema.Types;
    const SampleSchema = new Schema({ imei: { type: Imei } });
    SampleModel = mongoose.model('Sample', SampleSchema);
  });

  it('should exists loadType() function', () => {
    assert.equal(typeof ImeiModule.loadType, 'function');
  });

  it('should now has an "Imei" type in mongoose.Schema.Types', () => {
    assert.equal(
      Object.prototype.hasOwnProperty.call(Schema.Types, 'Imei'),
      true,
    );
  });

  it('should throws an error when given invalid IMEI', async () => {
    const sampleModel = new SampleModel({ imei: '123' });
    await assert.rejects(sampleModel.save(), {
      name: 'ValidationError',
      message: /IMEI is invalid/,
    });
  });

  it('should stores the proper IMEI value without any validation errors', async () => {
    const imei = '351680077319519';
    const sampleModel = new SampleModel({ imei });
    const result = await sampleModel.save();
    assert.equal(result.imei, imei);
  });

  after(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });
});
