// const app = require('./index.js');
// const db = require('./db')
// const supertest = require('supertest');
// const request = supertest(app);

// beforeAll(done => {
//   done();
// });

// afterAll(done => {
//   db.close();
//   done();
// });

// // generate random ID to test
// let randomID = Math.floor(Math.random() * (1000000 - 1) + 1);

// describe('/products API endpoint', () => {

//   let randomPage = Math.floor(Math.random() * (50 - 1) + 1);
//   let randomCount = Math.floor(Math.random() * (1000 - 1) + 1);

//   it('Should handle a GET request to /products', async done => {
//     const response = await request.get('/products');
//     expect(response.status).toBe(200);
//     expect(response.body.length).toBe(5);
//     expect(response.body[0].id).toBe(1);
//     done();
//   });

//   it(`Should handle a request with a random count param: ${randomCount}`, async done => {
//     const response = await request.get(`/products?count=${randomCount}`);
//     expect(response.status).toBe(200);
//     expect(response.body.length).toBe(randomCount);
//     expect(response.body[0].id).toBe(1);
//     done();
//   });

//   it(`Should handle a request with a random page param: ${randomPage}`, async done => {
//     const response = await request.get(`/products?page=${randomPage}`);
//     expect(response.status).toBe(200);
//     expect(response.body.length).toBe(5);
//     expect(response.body[0].id).toBe( (5*(randomPage-1)) + 1 );
//     done();
//   });

//   it(`Should handle a request with random count: ${randomCount}, and random page: ${randomPage}`, async done => {
//     const response = await request.get(`/products?count=${randomCount}&page=${randomPage}`);
//     expect(response.status).toBe(200);
//     expect(response.body.length).toBe(randomCount);
//     // expect(response.body[0].id).toBe((randomCount*(randomPage-1)) + 1);
//     done();
//   });

//   it('Should fail upon a request to an invalid endpoint', async done => {
//     const response = await request.get('/prodcuts');
//     expect(response.status).toBe(404);
//     done();
//   });

//   it('Should fail upon a request to an invalid count', async done => {
//     const response = await request.get(`/products?count=${-randomCount}`);
//     expect(response.status).toBe(404);
//     done();
//   });

//   it('Should fail upon a request to an invalid page', async done => {
//     const response = await request.get(`/products?page=${-randomPage}`);
//     expect(response.status).toBe(404);
//     done();
//   });

// });

// describe('/products/:product_id API endpoint', () => {

//   it('Should handle a GET request to /products/:product_id', async done => {
//     const response = await request.get(`/products/${randomID}`);
//     expect(response.status).toBe(200);
//     done();
//   });

//   it('Should return an object', async done => {
//     const response = await request.get(`/products/${randomID}`);
//     expect(typeof response.body).toBe('object');
//     done();
//   });

//   it(`Should retrieve data for specified id --> ${randomID}`, async done => {
//     const response = await request.get(`/products/${randomID}`);
//     expect(response.body.id).toBe(randomID);
//     done();
//   });

//   it('Should return a features array for the product', async done => {
//     const response = await request.get(`/products/${randomID}`);
//     expect(response.body.features !== undefined).toBe(true);
//     expect(Array.isArray(response.body.features)).toBe(true);
//     done();
//   });

//   it('Should fail upon invalid request url', async done => {
//     const response = await request.get(`/prodcuts/1`);
//     expect(response.status).toBe(404);
//     done();
//   });

//   it('Should fail upon a request to an invalid product id', async done => {
//     const response = await request.get(`/products/0`);
//     expect(response.status).toBe(404);
//     done();
//   });

// });
// // some product ids error out
// describe('/products/:product_id/styles API endpoint', () => {

//   it('Should handle a GET request to /products/:product_id/styles', async done => {
//     const response = await request.get(`/products/${randomID}/styles`);
//     expect(response.status).toBe(200);
//     done();
//   });

//   it('Should return an object', async done => {
//     const response = await request.get(`/products/${randomID}/styles`);
//     expect(typeof response.body).toBe('object');
//     done();
//   });

//   it(`Should retrieve data for specified id --> ${randomID}`, async done => {
//     const response = await request.get(`/products/${randomID}/styles`);
//     expect(response.body.product_id).toBe(`${randomID}`);
//     done();
//   });

//   it('Should return an array of results for the specified product id', async done => {
//     const response = await request.get(`/products/${randomID}/styles`);
//     expect(Array.isArray(response.body.results)).toBe(true);
//     expect(response.body.results.length >= 0).toBe(true);
//     done();
//   });

//   it('Should fail upon invalid request url', async done => {
//     const response = await request.get(`/products/1/stiles`);
//     expect(response.status).toBe(404);
//     done();
//   });

//   it('Should fail upon a request to an invalid product id', async done => {
//     const response = await request.get(`/products/0/styles`);
//     expect(response.status).toBe(200);
//     expect(response.body.results.length).toBe(0);
//     done();
//   });
// });

// describe('/products/:product_id/related API endpoint', () => {

//   it('Should handle a GET request to /products/:product_id/related', async done => {
//     const response = await request.get(`/products/${randomID}/related`);
//     expect(response.status).toBe(200);
//     done();
//   });

//   it(`Should retrieve data for specified id --> ${randomID}`, async done => {
//     const response = await request.get(`/products/${randomID}/related`);
//     expect(Array.isArray(response.body)).toBe(true);
//     expect(typeof response.body[0]).toBe('number');
//     done();
//   });

//   it('Should fail upon invalid request url', async done => {
//     const response = await request.get(`/products/1/relted`);
//     expect(response.status).toBe(404);
//     done();
//   });

//   it('Should fail upon a request to an invalid product id', async done => {
//     const response = await request.get(`/products/0/related`);
//     expect(response.status).toBe(200);
//     expect(response.body.length).toBe(0);
//     done();
//   });

// });