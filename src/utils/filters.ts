import { IFilters } from 'src/types/filters';

const queryToFilters = (_query: string): IFilters | undefined => {
  try {
    if (!_query) {
      return;
    }

    const queryArray = _query.replace('?', '').split('&');

    const result = {};

    if (!Array.isArray(queryArray) || !queryArray.length) {
      queryArray.forEach((param: string) => {
        const [key, value] = param.split('=');
        result[key] = value;
      });
    }
    return result;
  } catch (exception) {
    return;
  }
};

export { queryToFilters };
