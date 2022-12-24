import { resourceLimits } from 'worker_threads';
import ExchangeRate from './models/ExchangeRate';
import {
  ExchangeInfo,
  InputDeleteExchangeInfo,
  InputUpdateExchangeInfo,
} from './type';

export const resolvers = {
  Query: {
    async getExchangeRate(
      _,
      { src, tgt }: { src: string; tgt: string }
    ): Promise<ExchangeInfo | null> {
      return await ExchangeRate.findOne({ src, tgt });
    },
  },
  Mutation: {
    async postExchangeRate(
      _,
      { info }: { info: InputUpdateExchangeInfo }
    ): Promise<ExchangeInfo | null> {
      const { src, tgt } = info;

      return await ExchangeRate.findOneAndUpdate({ src, tgt }, info, {
        upsert: true,
      });
    },
    async deleteExchangeRate(
      _,
      info: InputDeleteExchangeInfo
    ): Promise<ExchangeInfo | null> {
      const { src, tgt, date } = info;
      return await ExchangeRate.findOneAndDelete({ src, tgt, date });
    },
  },
};
