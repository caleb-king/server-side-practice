const app = require('../app');
const { expect } = require('chai');
const supertest = require('supertest');

describe('GET /apps endpoints', () => {
  it('should return an array of apps',() => {
    return supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf.at.least(1);
        const appFromPlaystore = res.body[0];
        expect(appFromPlaystore).to.include.all.keys(
          'App', 
          'Category', 
          'Rating', 
          'Reviews', 
          'Size', 
          'Installs', 
          'Type', 
          'Price', 
          'Content Rating', 
          'Genres', 
          'Current Ver', 
          'Android Ver'
        );
      });
  });

  it('should be 400 if sort is incorrect', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'invalidValue'})
      .expect(400, 'if included, sort must be either Rating or App');
  });

  it('should be 400 if genres is incorrect', () => {
    return supertest(app)
      .get('/apps')
      .query({ genres: 'invalidValue'})
      .expect(400, 'if included, genres must be one of the following: Action, Puzzle, Strategy, Casual, Arcade, Card');
  });

  it('should sort alphabetically by title', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'App'})
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array');
        let sorted = true;

        let i = 0;
        // iterate once less than the length of the array
        // because we're comparing 2 items in the array at a time
        while (i < res.body.length - 1) {
          // compare book at `i` with next book at `i + 1`
          const appAtI = res.body[i];
          const appAtIPlus1 = res.body[i + 1];
          // if the next book is less than the book at i,
          if (appAtIPlus1.App < appAtI.App) {
            // the books were not sorted correctly
            sorted = false;
            break; // exit the loop
          }
          i++;
        }
        expect(sorted).to.be.true;
      });
  });

  it('should sort by rating - descending', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'Rating'})
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array');
        let sorted = true;

        let i = 0;
        // iterate once less than the length of the array
        // because we're comparing 2 items in the array at a time
        while (i < res.body.length - 1) {
          // compare book at `i` with next book at `i + 1`
          const appAtI = res.body[i];
          const appAtIPlus1 = res.body[i + 1];
          // if the next book is less than the book at i,
          if (appAtIPlus1.Rating > appAtI.Rating) {
            // the books were not sorted correctly
            sorted = false;
            break; // exit the loop
          }
          i++;
        }
        expect(sorted).to.be.true;
      });
  });

  it('should filter by genres', () => {
    return supertest(app)
      .get('/apps')
      .query({ genres: 'Puzzle'})
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array');
        let filtered = true;

        let i = 0;
        while (i < res.body.length) {
          const genre = res.body[i].Genres;
          if (!'Puzzle'.includes(genre)) {
            // the books were not filtered correctly
            filtered = false;
          }
          i++;
        }
        expect(filtered).to.be.true;
      });
  });
});

