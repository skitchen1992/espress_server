import { req } from './test-helpers';
import { SETTINGS } from '../src/settings';
import DB from '../src/db/db';
import { dataSet1, dataSet2, dataSet3, dataSet4, dataSetError } from './datasets';

const db = new DB();

describe.skip('Endpoint: videos (GET)', () => {
  beforeEach(async () => {
    db.clearDB();
  });

  it('Should get empty array', async () => {
    const res = await req.get(SETTINGS.PATH.VIDEOS).expect(200);

    expect(res.body.length).toBe(0);
  });

  it('Should get not empty array', async () => {
    db.addVideo(dataSet1);

    const res = await req.get(SETTINGS.PATH.VIDEOS).expect(200);

    expect(res.body.length).toBe(1);
    expect(res.body[0]).toEqual(dataSet1);
  });
});

describe.skip('Endpoint: videos (GET by ID)', () => {
  beforeEach(async () => {
    db.clearDB();
  });

  it('Should get item', async () => {
    db.addVideo(dataSet2);
    const res = await req.get(`${SETTINGS.PATH.VIDEOS}/1`).expect(200);

    expect(res.body).toEqual(dataSet2);
  });

  it('Should get error 404', async () => {
    db.addVideo(dataSet2);

    const res = await req.get(`${SETTINGS.PATH.VIDEOS}/2`).expect(404);

    expect(res.status).toEqual(404);
  });
});

describe('Endpoint: videos (POST)', () => {
  beforeEach(async () => {
    db.clearDB();
  });

  it('Should add item', async () => {
    const res = await req.post(SETTINGS.PATH.VIDEOS)
      .send(dataSet3)
      .expect(201);

    expect(res.body).toEqual(expect.objectContaining(dataSet3));

    const dbRes = db.getVideo(res.body.id);

    expect(dbRes).toEqual(expect.objectContaining(dataSet3));
  });

  it('Should return an error for invalid video data', async () => {
    const res = await req.post(SETTINGS.PATH.VIDEOS)
      .send(dataSet4)
      .expect(400);

    expect(res.body).toEqual(dataSetError);
  });
});



