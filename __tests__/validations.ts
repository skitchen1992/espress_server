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

export const inputValidation = (data: IData) => {
  const errors: IErrors = {
    errorsMessages: [],
  };

  for (const key in data) {
    if (key === 'title') {
      if (data[key].length > 40) {
        errors.errorsMessages.push({ message: 'To long length ', field: key });
      } else if (typeof data[key] !== 'string') {
        errors.errorsMessages.push({ message: 'Incorrect type ', field: key });
      }
    }

    if (key === 'author') {
      if (data[key].length > 20) {
        errors.errorsMessages.push({ message: 'To long length ', field: key });
      } else if (typeof data[key] !== 'string') {
        errors.errorsMessages.push({ message: 'Incorrect type ', field: key });
      }
    }

    if (key === 'availableResolutions') {
      if (Array.isArray(data[key])) {
        const arr = data[key] as string[];

        arr.forEach((item) => {
          // @ts-ignore
          if (FLIGHT_OUT_STATUSES[item]) {
            errors.errorsMessages.push({ message: 'Incorrect item ', field: key });
          }
        });
      }
    }
  }

  return errors.errorsMessages.length > 0 ? errors : null;
};
