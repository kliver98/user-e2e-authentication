const axios = require('axios');
const { expect } = require('chai');
const faker = require('faker');
const cs = require('../constants');

let response;
let rand_number = Math.floor(Math.random() *1000)+908123

const user = {
    lastname: `${faker.random.words(4)}`,
    firstname: `${faker.random.words(4)}`,
    username: `${faker.random.words(1)}-${rand_number}`,
    id_type: "CC",
    _id: rand_number,
    password: `${faker.random.words(4)}`,
    photo: `${faker.internet.url()}`,
    active: true,
}

describe("When user wants to log-in",() => {
    before(async()=>{
        //assuming it works and making sure user exists
        await axios.post(`${cs.baseUrlUserService}users`,user)
        let credentials = {
            username:user.username,
            password:user.password
        }
        response = await axios.post(cs.baseUrl+'users/auth/',credentials);
    });

    it('Then should return a 200 OK status code',() => {
        expect(response.status).eql(200);
    });

    it('Then return basic user info [id,username,photo,active]',() => {
        const resUser = response.data;
        expect(resUser).to.have.property("_id");
        expect(resUser).to.have.property("username");
        expect(resUser).to.have.property("photo");
        expect(resUser).to.have.property("active");
    })

    it('Then return a json as content type',() => {
        expect(response.headers['content-type']).to.contain('application/json');
    });

    after(async() => {
        await axios.delete(`${cs.baseUrlUserService}users/${response.data._id}`);
    });
    
});