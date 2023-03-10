const { expect } = require('chai')
const request = require('supertest')
const db = require('../../src/db')
const app = require('../../src/app')

describe('Delete Albums', () => {
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

    describe('DELETE /albums/{id}', () => {
        it('deletes the album and returns the deleted data', async () => {
            const { status, body } = await request(app).delete(`/albums/${albums[0].id}}`).send()

            expect(status).to.equal(200)

            expect(body).to.deep.equal({ id: artist.id, name: 'Tame Impala', genre: 'indie' })
        })

        it('returns a 404 if the album does not exist', async () => {
            const { status, body } = await request(app).delete('/albums/999999999').send()

            expect(status).to.equal(404)
            expect(body.message).to.equal('album 999999999 does not exist')
        })
    })
})
