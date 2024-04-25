import express, { Request, Response } from 'express';
import { SETTINGS } from './settings';
import DB from './db/db';
import { FLIGHT_OUT_STATUSES, inputValidation } from './validations';

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

  if (video) {
    res.status(200).send(video);
  } else {
    res.send(404);
  }
});

app.post(SETTINGS.PATH.VIDEOS, (req: Request, res: Response) => {
  const errors = inputValidation(req.body);

  if(!errors){
    const newVideo = {
      ...req.body,
      id: Date.now() + Math.random(),
      canBeDownloaded: true,
      minAgeRestriction: null,
      createdAt: new Date().toISOString(),
      publicationDate: new Date().toISOString(),
    }

    db.addVideo(newVideo)

    res.status(201).send(newVideo);
  }else{
    res.status(400).send(errors);
  }
});

app.put(`${SETTINGS.PATH.VIDEOS}/:id`, (req: Request, res: Response) => {
  const a = 'Hello Word!';
  res.send(a);
});

app.delete(`${SETTINGS.PATH.VIDEOS}/:id`, (req: Request, res: Response) => {
  const a = 'Hello Word!';
  res.send(a);
});
