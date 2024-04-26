interface IErrorsMessages {
  message: string;
  field: string;
}

interface IErrors {
  errorsMessages: IErrorsMessages[];
}

export interface IData {
  [key: string]: any;
}

export const FLIGHT_OUT_STATUSES = {
  P144: 'P144',
  P240: 'P240',
  P360: 'P360',
  P480: 'P480',
  P720: 'P720',
  P1080: 'P1080',
  P1440: 'P1440',
  P2160: 'P2160',
};

export const inputValidation = (data: IData, method?: 'POST') => {
  const errors: IErrors = {
    errorsMessages: [],
  };

  if (method === 'POST') {
    if (!data.title) {
      errors.errorsMessages.push({ message: 'Require field', field: 'title' });
    }
    if (!data.author) {
      errors.errorsMessages.push({ message: 'Require field', field: 'author' });
    }
  }


  for (const key in data) {
    if (key === 'title') {
      if (typeof data[key] !== 'string') {
        errors.errorsMessages.push({ message: 'Incorrect type', field: key });
      }
      if (data[key].length > 40) {
        errors.errorsMessages.push({ message: 'Too long length', field: key });
      }
    }

    if (key === 'author') {
      if (typeof data[key] !== 'string') {
        errors.errorsMessages.push({ message: 'Incorrect type', field: key });
        return;
      }
      if (data[key].length > 20) {
        errors.errorsMessages.push({ message: 'Too long length', field: key });
      }
    }

    if (key === 'availableResolutions') {
      if (Array.isArray(data[key])) {

        const arr = data[key] as string[];

        arr.forEach((item) => {
          // @ts-ignore
          if (!Boolean(FLIGHT_OUT_STATUSES[item])) {
            errors.errorsMessages.push({ message: 'Incorrect item', field: key });
          }
        });
      }

      if (data[key] !== null && !Array.isArray(data[key])) {
        errors.errorsMessages.push({ message: 'Incorrect type', field: key });
      }
    }

    if (key === 'canBeDownloaded') {
      if (typeof data[key] !== 'boolean') {
        errors.errorsMessages.push({ message: 'Incorrect type', field: key });
      }
    }

    if (key === 'minAgeRestriction') {
      if (typeof data[key] !== 'number' && data[key] !== null) {
        errors.errorsMessages.push({ message: 'Incorrect type', field: key });
      } else if (data[key] < 1) {
        errors.errorsMessages.push({ message: 'Cannot be less than 1', field: key });
      } else if (data[key] > 18) {
        errors.errorsMessages.push({ message: 'Cannot be more than 18', field: key });
      }
    }

    if (key === 'publicationDate') {
      if (typeof data[key] !== 'string') {
        errors.errorsMessages.push({ message: 'Incorrect type', field: key });
      }
    }
  }


  return errors.errorsMessages.length > 0 ? errors : null;
};
