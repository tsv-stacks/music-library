const { expect } = require('chai')
const request = require('supertest')
const db = require('../src/db')
const app = require('../src/app')

describe('Read Albums', () => {
    let albums
    let artist
    beforeEach(async () => {
        const { rows } = await db.query('INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *', [
            'Tame Impala',
            'indie',
        ])

        artist = rows[0]

        const responses = await Promise.all([
            db.query('INSERT INTO Albums (name, year, artistID) VALUES( $1, $2, $3 ) RETURNING *', [
                'The Slow Rush',
                2020,
                artist.id
            ]),
            db.query('INSERT INTO Albums (name, year, artistID) VALUES( $1, $2, $3 ) RETURNING *', [
                'Currents',
                2015,
                artist.id
            ]),
        ])

        albums = responses.map(({ rows }) => rows[0])
    })

    describe('GET /albums', () => {
        it('returns all album records in the database', async () => {
            const { status, body } = await request(app).get('/albums').send()

            expect(status).to.equal(200)
            expect(body.length).to.equal(2)

            body.forEach((albumRecord) => {
                const expected = albums.find((a) => a.id === albumRecord.id)

                expect(albumRecord).to.deep.equal(expected)
            })
        })
    })

    describe('GET /albums/{id}', () => {
        it('returns the album with the correct id', async () => {
            const { status, body } = await request(app).get(`/albums/${albums[0].id}`).send()

            expect(status).to.equal(200)
            expect(body).to.deep.equal(albums[0])
        })

        it('returns a 404 if the album does not exist', async () => {
            const { status, body } = await request(app).get('/albums/999999999').send()

            expect(status).to.equal(404)
            expect(body.message).to.equal('album 999999999 does not exist')
        })
    })

})
