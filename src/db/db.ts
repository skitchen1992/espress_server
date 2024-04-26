export interface IVideo {
  id?: number;
  title: string;
  author: string;
  canBeDownloaded?: boolean;
  minAgeRestriction?: number | null;
  createdAt?: string;
  publicationDate?: string;
  availableResolutions?: string[];
}

export type DBType = {
  videos: IVideo[];
};
const db: DBType = {
  videos: [
    // {
    //     "id": 1,
    //     "title": "Introduction to JSON",
    //     "author": "Alice Johnson",
    //     "canBeDownloaded": true,
    //     "minAgeRestriction": null,
    //     "createdAt": "2024-04-23T19:00:00.000Z",
    //     "publicationDate": "2024-04-23T19:00:00.000Z",
    //     "availableResolutions": ["P144", "P360"]
    // },
    // {
    //     "id": 2,
    //     "title": "Advanced JSON Techniques",
    //     "author": "Bob Smith",
    //     "canBeDownloaded": false,
    //     "minAgeRestriction": 12,
    //     "createdAt": "2024-04-23T19:05:00.000Z",
    //     "publicationDate": "2024-04-23T19:05:00.000Z",
    //     "availableResolutions": ["P240", "P480", "P720"]
    // },
    // {
    //     "id": 3,
    //     "title": "JSON and APIs",
    //     "author": "Carol White",
    //     "canBeDownloaded": true,
    //     "minAgeRestriction": 16,
    //     "createdAt": "2024-04-23T19:10:00.000Z",
    //     "publicationDate": "2024-04-23T19:10:00.000Z",
    //     "availableResolutions": ["P144", "P360", "P1080"]
    // }
  ],
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
  public addVideo(data: IVideo) {
    this.db.videos.push(data);
  }

  public updateVideo(id: number, data: IVideo) {
    const videoIndex = this.findIndex(id);

    if (videoIndex !== -1) {
       this.db.videos[videoIndex] = {
        ...this.db.videos[videoIndex],
        ...data,
        id: this.db.videos[videoIndex].id,
        createdAt: this.db.videos[videoIndex].createdAt,
      };
       return true
    }else {
      return false
    }
  }

  public deleteVideo(id: number) {
    const videoIndex = this.findIndex(id);

    if (videoIndex !== -1) {
      this.db.videos.splice(videoIndex, 1);
      return true
    } else {
      return false
    }
  }

  public findIndex(id: number) {
    return this.db.videos.findIndex((video) => video.id === id);
  }

  public clearDB() {
    return (this.db.videos = []);
  }
}
