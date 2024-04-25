import express, { Request, Response } from 'express';
import { SETTINGS } from './settings';
import DB from './db/db';
import { inputValidation } from '../__tests__/validations';

export const app = express();

app.use(express.json());

const db = new DB();

app.get('/', (req, res) => {
  res.status(200).json({ version: '1.0' });
});

app.get(SETTINGS.PATH.VIDEOS, (req: Request, res: Response) => {
  const videos = db.getVideos();

  if (videos) {
    res.status(200).send(videos);
  }
});

app.get(`${SETTINGS.PATH.VIDEOS}/:id`, (req: Request, res: Response) => {
  const id = req.params.id;

  const video = db.getVideo(Number(id));
  console.log('video', video);
  if (video) {
    res.status(200).send(video);
  } else {
    res.send(404);
  }
});

app.post(SETTINGS.PATH.VIDEOS, (req: Request, res: Response) => {
  const errors = inputValidation(req.body);
  const newVideo = req.body;

  console.log(req.body);

  res.status(201).json({ test: req.body });
});

app.put(`${SETTINGS.PATH.VIDEOS}/:id`, (req: Request, res: Response) => {
  const a = 'Hello Word!';
  res.send(a);
});

app.delete(`${SETTINGS.PATH.VIDEOS}/:id`, (req: Request, res: Response) => {
  const a = 'Hello Word!';
  res.send(a);
});
