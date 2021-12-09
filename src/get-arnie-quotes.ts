import { httpGet } from './mock-http-interface';

type SuccessResult = {
  'Arnie Quote': string
}
type FailureResult = {
  FAILURE: string
}
type TResult = SuccessResult | FailureResult;

export const getArnieQuotes = async (urls: string[]): Promise<TResult[]> => {
  const results = await Promise.all(urls.map(async url => {
    const getOneQuote = await httpGet(url)
    const msg = JSON.parse(getOneQuote.body).message
    if (getOneQuote.status === 200) {
      return { "Arnie Quote": msg };
    } else {
      return { FAILURE: msg };
    }
  })
  )
  return results;
};
