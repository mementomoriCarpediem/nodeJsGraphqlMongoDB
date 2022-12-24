import { ADDRGETNETWORKPARAMS } from 'dns';
import moment from 'moment';
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
      params: { src: string; tgt: string }
    ): Promise<ExchangeInfo | null> {
      return await ExchangeRate.findOne(params);
    },
  },

  Mutation: {
    async postExchangeRate(
      _,
      { info }: { info: InputUpdateExchangeInfo }
    ): Promise<ExchangeInfo | null> {
      const { src, tgt, date } = info;
      const isSameCurrency = src === tgt;

      isSameCurrency ? Object.assign(info, { rate: 1 }) : info;

      date
        ? info
        : Object.assign(info, { date: moment().format('YYYY-MM-DD') });

      return await ExchangeRate.findOneAndUpdate({ src, tgt }, info, {
        upsert: true,
        new: true,
      });
    },

    async deleteExchangeRate(
      _,
      { info }: { info: InputDeleteExchangeInfo }
    ): Promise<ExchangeInfo | null> {
      return await ExchangeRate.findOneAndDelete(info);
    },
  },
};
