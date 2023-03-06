const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('create album', () => {
    describe('/artists/:id/albums', () => {
        let artist
        beforeEach(async () => {
            console.log('beforeEach hook executed successfully');

            const { rows } = await db.query('INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *', [
                'Tame Impala',
                'indie',
            ])

            artist = rows[0]
        })

        describe('POST', () => {
            it('creates a new album in the database', async () => {
                const { status, body } = await request(app).post(`/artists/${artist.id}/albums`).send({
                    name: 'The Slow Rush',
                    year: 2020,
                });

                expect(status).to.equal(201);
                expect(body.name).to.equal('The Slow Rush');
                expect(body.year).to.equal(2020);

                const {
                    rows: [artistData],
                } = await db.query(`SELECT * FROM Albums WHERE id = ${body.id}`);
                expect(artistData.name).to.equal('The Slow Rush');
                expect(artistData.year).to.equal(2020);
                expect(artistData.artistID).to.equal(artist.id)
            });

            it('returns a 404 if the artist does not exist', async () => {
                const { status, body } = await request(app).delete('/artists/999999999/albums').send()

                expect(status).to.equal(404)
                expect(body.message).to.equal('artist 999999999 does not exist')
            })
        });
    });
});
