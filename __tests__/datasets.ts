export const dataSet1 = {
  title: 'Introduction to JSON',
  author: 'Alice Johnson',
  availableResolutions: ['P144', 'P360'],
};

export const dataSet2 = {
  id: 1,
  title: 'Introduction to JSON',
  author: 'Alice Johnson',
  canBeDownloaded: true,
  minAgeRestriction: null,
  createdAt: '2024-04-23T19:00:00.000Z',
  publicationDate: '2024-04-23T19:00:00.000Z',
  availableResolutions: ['P144', 'P360'],
};

export const dataSet3 = {
  title: 'JSON and APIs',
  author: 'Carol White',
  availableResolutions: ['P144', 'P360', 'P1080'],
};

export const dataSet4 = {
  author: 'Carol White',
  availableResolutions: ['P144', 'P360', 'P10809'],
};

export const dataSetError = {
  errorsMessages: [
    {
      message: 'Require field',
      field: 'title',
    },
  ],
};

export const requestDataPut = {
  title: 'TEST',
  author: 'TEST',
  canBeDownloaded: false,
  minAgeRestriction: 2,
  publicationDate: '2025-04-23T19:00:00.000Z',
  availableResolutions: null,
};

export const updatedRequestDataPut = {
  id: 1,
  createdAt: '2024-04-23T19:00:00.000Z',
  title: 'TEST',
  author: 'TEST',
  canBeDownloaded: false,
  minAgeRestriction: 2,
  publicationDate: '2025-04-23T19:00:00.000Z',
  availableResolutions: null,
};

export const requestDataPutError = {
  author: 'TEST',
  canBeDownloaded: false,
  minAgeRestriction: 43,
  publicationDate: '2025-04-23T19:00:00.000Z',
  availableResolutions: null,
};

export const dataSetErrorPut = {
  errorsMessages: [{ message: 'Cannot be more than 18', field: 'minAgeRestriction' }],
};

