import { VideoViewModel } from '../models/VideoViewModel';


export type DBType = {
  videos: VideoViewModel[];
};

const db: DBType = {
  videos: [],
};

export default class DB {
  private db: DBType;

  constructor() {
    this.db = db;
  }

  public getVideos() {
    return this.db.videos;
  }

  public getVideo(id: number) {
    const videoIndex = this.findIndex(id);

    if (videoIndex === -1) {
      return null;
    } else {
      return this.db.videos[videoIndex];
    }
  }

  public addVideo(data: VideoViewModel) {
    this.db.videos.push(data);
  }

  public updateVideo(id: number, data: VideoViewModel) {
    const videoIndex = this.findIndex(id);

    if (videoIndex !== -1) {
      this.db.videos[videoIndex] = {
        ...this.db.videos[videoIndex],
        ...data,
        id: this.db.videos[videoIndex].id,
        createdAt: this.db.videos[videoIndex].createdAt,
      };
      return true;
    } else {
      return false;
    }
  }

  public deleteVideo(id: number) {
    const videoIndex = this.findIndex(id);

    if (videoIndex !== -1) {
      this.db.videos.splice(videoIndex, 1);
      return true;
    } else {
      return false;
    }
  }

  public findIndex(id: number) {
    return this.db.videos.findIndex((video) => video.id === id);
  }

  public clearDB() {
    return (this.db.videos = []);
  }
}
