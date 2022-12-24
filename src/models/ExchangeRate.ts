import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ExchangeRate = new Schema({
  src: { type: String, required: true },
  tgt: { type: String, required: true },
  rate: { type: Number, require: true },
  date: { type: String, default: new Date().toDateString(), require: true },
});

ExchangeRate.index({ src: 1, tgt: 1 }, { unique: true });

export default mongoose.model('exchangeRate', ExchangeRate);
