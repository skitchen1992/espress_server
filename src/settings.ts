import { config } from 'dotenv';

config(); // добавление переменных из файла .env в process.env

export const SETTINGS = {
  PORT: process.env.PORT,
  PATH: {
    VIDEOS: '/hometask_01/api/videos',
  },
};
