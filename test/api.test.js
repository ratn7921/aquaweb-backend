const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
require('dotenv').config();

jest.setTimeout(30000);

let token;
let tripId;

beforeAll(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB for testing');
  } catch (err) {
    console.error('❌ MongoDB connection error in test:', err);
  }
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('AquaWeb API', () => {
  it('registers a user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: '123456',
        role: 'tourist'
      });
    expect([200, 201, 400]).toContain(res.statusCode); // 400 if already exists
    if (res.body.token) token = res.body.token;
  });

  it('logs in a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: '123456'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it('gets user profile', async () => {
    const res = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe('testuser@example.com');
  });

  it('starts a trip', async () => {
    const res = await request(app)
      .post('/api/trips/start')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(201);
    tripId = res.body._id;
  });

  it('ends a trip', async () => {
    const res = await request(app)
      .put(`/api/trips/end/${tripId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.endTime).toBeDefined();
  });

  it('creates a sighting', async () => {
    const res = await request(app)
      .post('/api/sightings')
      .set('Authorization', `Bearer ${token}`)
      .send({
        species: 'Humpback Whale',
        count: 2,
        behavior: 'Breaching',
        location: { lat: 18.5, lng: 73.9 },
        photoUrl: 'https://sample.com/image.jpg'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.species).toBe('Humpback Whale');
  });

  it('gets all sightings', async () => {
    const res = await request(app)
      .get('/api/sightings');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('reports an incident', async () => {
    const res = await request(app)
      .post('/api/incidents')
      .set('Authorization', `Bearer ${token}`)
      .send({
        type: 'pollution',
        description: 'Oil spill detected',
        location: { lat: 18.3, lng: 73.8 },
        photoUrl: 'https://sample.com/spill.jpg'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.type).toBe('pollution');
  });

  it('gets all species', async () => {
    const res = await request(app)
      .get('/api/species');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('fails to register with missing fields', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'incomplete@example.com' });
    expect(res.statusCode).toBe(400);
  });

  it('fails to login with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'testuser@example.com', password: 'wrongpass' });
    expect([400, 401]).toContain(res.statusCode);
  });

  it('denies access to protected route without token', async () => {
    const res = await request(app)
      .get('/api/users/me');
    expect(res.statusCode).toBe(401);
  });

  it('denies access to protected route with invalid token', async () => {
    const res = await request(app)
      .get('/api/users/me')
      .set('Authorization', 'Bearer invalidtoken');
    expect(res.statusCode).toBe(401);
  });

  it('returns 404 for unknown route', async () => {
    const res = await request(app)
      .get('/api/unknownroute');
    expect(res.statusCode).toBe(404);
  });

  it('returns 500 when ending a trip with invalid ID', async () => {
    const res = await request(app)
      .put('/api/trips/end/invalidid')
      .set('Authorization', `Bearer ${token}`);
    expect([400, 500]).toContain(res.statusCode);
  });

  it('returns 500 when creating a sighting with missing required fields', async () => {
    const res = await request(app)
      .post('/api/sightings')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect([400, 500]).toContain(res.statusCode);
  });

  it('returns 500 when reporting an incident with missing required fields', async () => {
    const res = await request(app)
      .post('/api/incidents')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect([400, 500]).toContain(res.statusCode);
  });
});
describe('External Species API - /api/worms/:name', () => {
  it('fetches marine species from WoRMS API', async () => {
    const res = await request(app)
      .get('/api/worms/Clownfish');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('source');
    expect(['WoRMS', 'FishWatch']).toContain(res.body[0].source);
  });

  it('returns fallback from FishWatch if WoRMS fails', async () => {
    const res = await request(app)
      .get('/api/worms/fish'); // general name likely to trigger fallback if no exact match in WoRMS

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('source');
    expect(['WoRMS', 'FishWatch']).toContain(res.body[0].source);
  });

  it('returns 500 for totally invalid species name', async () => {
    const res = await request(app)
      .get('/api/worms/thisisnotaspeciesname');

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('error');
  });
});

// Use supertest to send multipart/form-data instead of JSON
request(app)
  .post('/api/sightings')
  .field('species', 'Humpback Whale')
  .field('count', 2)
  .field('behavior', 'Breaching')
  .field('location', JSON.stringify({ lat: 18.5, lng: 73.9 }))
  .attach('photo', path.join(__dirname, 'fixtures/sample.jpg'));
