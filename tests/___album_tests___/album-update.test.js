const { expect } = require('chai');
const request = require('supertest');
const db = require('../../src/db');
const app = require('../../src/app');

describe('Update Albums', () => {
  let albums;
  let artist;
  beforeEach(async () => {
    const { rows } = await db.query(
      'INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *',
      ['Tame Impala', 'indie']
    );

    artist = rows[0];

    const responses = await Promise.all([
      db.query(
        'INSERT INTO Albums (name, year, artistID) VALUES( $1, $2, $3 ) RETURNING *',
        ['The Slow Rush', 2020, artist.id]
      ),
      db.query(
        'INSERT INTO Albums (name, year, artistID) VALUES( $1, $2, $3 ) RETURNING *',
        ['Currents', 2015, artist.id]
      ),
    ]);

    albums = responses.map(({ rows }) => rows[0]);
  });

  describe('PUT /albums/{id}', () => {
    it('replaces the album and returns the updated record', async () => {
      const { status, body } = await request(app)
        .put(`/albums/${albums[0].id}`)
        .send({ name: 'something different', year: 2023 });

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        artistid: artist.id,
        id: albums[0].id,
        name: 'something different',
        year: 2023,
      });
    });

    it('returns a 404 if the artist does not exist', async () => {
      const { status, body } = await request(app)
        .put('/albums/999999999')
        .send({ name: 'something different', year: 2023 });

      expect(status).to.equal(404);
      expect(body.message).to.equal('album 999999999 does not exist');
    });
  });

  describe('PATCH /albums/{id}', () => {
    it('updates the artist and returns the updated record', async () => {
      const { status, body } = await request(app)
        .patch(`/albums/${albums[0].id}`)
        .send({ name: 'something different', year: 2023 });

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        artistid: artist.id,
        id: albums[0].id,
        name: 'something different',
        year: 2023,
      });
    });

    it('updates the album year and returns the updated record', async () => {
      const { status, body } = await request(app)
        .patch(`/albums/${albums[0].id}`)
        .send({ year: 2020 });

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        artistid: artist.id,
        id: albums[0].id,
        year: 2020,
        name: 'The Slow Rush',
      });
    });

    it('returns a 404 if the album does not exist', async () => {
      const { status, body } = await request(app)
        .patch('/albums/999999999')
        .send({ name: 'something different', genre: 'rock' });

      expect(status).to.equal(404);
      expect(body.message).to.equal('album 999999999 does not exist');
    });

    it('updates the album name and returns the updated record', async () => {
      const { status, body } = await request(app)
        .patch(`/albums/${albums[0].id}`)
        .send({ name: 'something different' });

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        artistid: artist.id,
        id: albums[0].id,
        year: 2020,
        name: 'something different',
      });
    });
  });
});
