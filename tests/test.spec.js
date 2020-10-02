const mongoose = require('mongoose');
const { Mockgoose } = require('mockgoose');
const ImeiModule = require('../index.js');

const mockgoose = new Mockgoose(mongoose);

ImeiModule.loadType(mongoose);
const { Schema } = mongoose;

const { Imei } = Schema.Types;
const SampleSchema = new Schema({ imei: { type: Imei } });
const SampleModel = mongoose.model('Sample', SampleSchema);

describe('Mongoose IMEI', () => {
  beforeAll(async () => {
    await mockgoose.prepareStorage();
    await mongoose.connect('mongodb://localhost/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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
    const Model = new SampleModel({ imei });
    const result = await Model.save();
    expect(result.imei).toEqual(imei);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mockgoose.shutdown();
  });
});
