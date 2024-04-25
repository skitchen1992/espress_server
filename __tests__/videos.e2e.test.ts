import { req } from './test-helpers';
import { SETTINGS } from '../src/settings';
import DB from '../src/db/db';
import { dataSet1, dataSet2 } from './datasets';

const db = new DB();

describe.skip('Endpoint: videos (GET)', () => {
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

describe('Endpoint: videos (GET by ID)', () => {
  it('Should get item', async () => {
    db.clearDB();
    db.addVideo(dataSet2);
    const res = await req.get(`${SETTINGS.PATH.VIDEOS}/1`).expect(200);

    expect(res.body).toEqual(dataSet2);
  });

  it('Should get error 404', async () => {
    db.clearDB();
    db.addVideo(dataSet2);

    const res = await req.get(`${SETTINGS.PATH.VIDEOS}/2`).expect(404);

    expect(res.status).toEqual(404);
  });
});

describe('Endpoint: videos (POST)', () => {
  it('Should get item', async () => {
    db.clearDB();
    db.addVideo(dataSet2);
    const res = await req.get(`${SETTINGS.PATH.VIDEOS}/1`).expect(200);

    expect(res.body).toEqual(dataSet2);
  });

  it('Should get error 404', async () => {
    db.clearDB();
    db.addVideo(dataSet2);

    const res = await req.get(`${SETTINGS.PATH.VIDEOS}/2`).expect(404);

    expect(res.status).toEqual(404);
  });
});
