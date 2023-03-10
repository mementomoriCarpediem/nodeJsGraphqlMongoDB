import moment from 'moment';
import ExchangeRate from 'src/models/ExchangeRate';
import {
  ErorMessage,
  ExchangeInfo,
  InputDeleteExchangeInfo,
  InputUpdateExchangeInfo,
} from 'src/type';

export const resolvers = {
  Query: {
    async getExchangeRate(
      _,
      params: { src: string; tgt: string }
    ): Promise<ExchangeInfo | null> {
      if (!params.src || !params.tgt)
        throw new Error(ErorMessage.REQUIRED_PARAM_MISSING);

      return await ExchangeRate.findOne(params);
    },
  },

  Mutation: {
    async postExchangeRate(
      _,
      { info }: { info: InputUpdateExchangeInfo }
    ): Promise<ExchangeInfo | null> {
      if (!info.src || !info.tgt)
        throw new Error(ErorMessage.REQUIRED_PARAM_MISSING);

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
      if (!info.src || !info.tgt || !info.date)
        throw new Error(ErorMessage.REQUIRED_PARAM_MISSING);

      return await ExchangeRate.findOneAndDelete(info);
    },
  },
};
