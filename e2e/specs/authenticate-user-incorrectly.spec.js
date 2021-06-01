const axios = require('axios');
const { expect } = require('chai');
const faker = require('faker');
const cs = require('../constants');

let response;
let rand_number = Math.floor(Math.random() *1000)+908123

const credentials = {
    username: `Test-${faker.random.words(2)}-${rand_number}`,
    password: `Test-${faker.random.words(4)}-${rand_number}`
}

describe("When user wants to log-in but credentials are wrong",() => {

    describe('When neither username nor password exists',() => {

        it('Then should return a 406 Client error Not acceptable credentials',async() => {
            await axios.post(`${cs.baseUrl}users/auth/`,credentials).catch(err => {
                expect(err.response.status).to.eql(406);
            });
        });

    });

    describe('When username does not exist',() => {
        
        it('Then should return a 406 Client error Not acceptable credentials',async() => {
            response = await axios.get(`${cs.baseUrlUserService}users`)
            credentials.username = response.data[0].username || 'admin'
            await axios.post(`${cs.baseUrl}users/auth/`,credentials).catch(err => {
                expect(err.response.status).to.eql(406);
            });
        });

    });
    
});