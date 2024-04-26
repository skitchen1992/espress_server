import express from 'express';
import { SETTINGS } from './utils/settings';
import {
  deleteAllVideoController,
  deleteVideoController,
  getVideoByIDController,
  getVideosController,
  postVideoController,
  putVideoController,
} from './controllers/videos';

export const app = express();

app.use(express.json());


app.get('/', (req, res) => {
  res.status(200).json({ version: '1.0' });
});

app.get(SETTINGS.PATH.VIDEOS, getVideosController);

app.get(`${SETTINGS.PATH.VIDEOS}/:id`, getVideoByIDController);

app.post(SETTINGS.PATH.VIDEOS, postVideoController);

app.put(`${SETTINGS.PATH.VIDEOS}/:id`, putVideoController);

app.delete(`${SETTINGS.PATH.VIDEOS}/:id`, deleteVideoController);

app.delete(`${SETTINGS.PATH.TESTING.ALL_DATA}`, deleteAllVideoController);
