const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const ImeiModule = require('../index');

const { Schema } = mongoose;

jest.setTimeout(30000);

let mongod;
let SampleModel;

describe('Mongoose IMEI', () => {
  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    await mongoose.connect(uri);

    ImeiModule.loadType(mongoose);

    const { Imei } = Schema.Types;
    const SampleSchema = new Schema({ imei: { type: Imei } });
    SampleModel = mongoose.model('Sample', SampleSchema);
  });

  it('should exists loadType() function', () => {
    expect(typeof ImeiModule.loadType).toEqual('function');
  });

  it('should now has an "Imei" type in mongoose.Schema.Types', () => {
    expect(Object.prototype.hasOwnProperty.call(Schema.Types, 'Imei')).toEqual(
      true,
    );
  });

  it('should throws an error when given invalid IMEI', async () => {
    const sampleModel = new SampleModel({ imei: '123' });
    await expect(sampleModel.save()).rejects.toThrowError('IMEI is invalid');
  });

  it('should stores the proper IMEI value without any validation errors', async () => {
    const imei = '351680077319519';
    const sampleModel = new SampleModel({ imei });
    const result = await sampleModel.save();
    expect(result.imei).toEqual(imei);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });
});
