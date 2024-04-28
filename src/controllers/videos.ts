import DB, { IVideo } from '../db/db';
import { Request, Response } from 'express';
import { inputValidation } from '../utils/validations';
import { HTTP_STATUSES } from '../utils/consts';

const db = new DB();
export const getVideosController = (req: Request, res: Response<IVideo[]>) => {
  const videos = db.getVideos();

  if (videos) {
    res.status(HTTP_STATUSES.OK_200).send(videos);
  }
};

export const getVideoByIDController = (req: Request, res: Response<IVideo | number>) => {
  const id = req.params.id;

  const video = db.getVideo(Number(id));

  if (video) {
    res.status(HTTP_STATUSES.OK_200).json(video);
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
};

export const postVideoController = (req: Request, res: Response) => {
  const errors = inputValidation(req.body, 'POST');

  if (!errors) {

    const publicationDate = new Date(new Date().getTime() + 86400000).toISOString();

    const newVideo = {
      ...req.body,
      id: Date.now() + Math.random(),
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: new Date().toISOString(),
      publicationDate,
    };

    db.addVideo(newVideo);

    res.status(HTTP_STATUSES.CREATED_201).json(newVideo);
  } else {
    res.status(HTTP_STATUSES.BAD_REQUEST_400).json(errors);
  }
};

export const putVideoController = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const errors = inputValidation(req.body);

  if (!errors) {
    const updated = db.updateVideo(id, req.body);

    if (updated) {
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
  } else {
    res.status(HTTP_STATUSES.BAD_REQUEST_400).json(errors);
  }
};

export const deleteVideoController = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = db.deleteVideo(id);

  if (updated) {
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  }
};

export const deleteAllVideoController = (req: Request, res: Response) => {
  db.clearDB();
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
};
