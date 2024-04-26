import express, { Request, Response } from 'express';
import { SETTINGS } from './settings';
import DB from './db/db';
import { inputValidation } from './validations';

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
  const errors = inputValidation(req.body, 'POST');

  if (!errors) {
    const newVideo = {
      ...req.body,
      id: Date.now() + Math.random(),
      canBeDownloaded: true,
      minAgeRestriction: null,
      createdAt: new Date().toISOString(),
      publicationDate: new Date().toISOString(),
    };

    db.addVideo(newVideo);

    res.status(201).send(newVideo);
  } else {
    res.status(400).send(errors);
  }
});

app.put(`${SETTINGS.PATH.VIDEOS}/:id`, (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const errors = inputValidation(req.body);

  if (!errors) {
    const updated = db.updateVideo(id, req.body);

    if (updated) {
      res.status(204).send();
    } else {
      res.status(404).send({
        errorsMessages: [{
          message: 'Video not found',
          field: '',
        }],
      });
    }
  } else {
    res.status(400).send(errors);  // Send back any validation errors
  }
});

app.delete(`${SETTINGS.PATH.VIDEOS}/:id`, (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = db.deleteVideo(id);

  if (updated) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});
