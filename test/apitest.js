import request from 'supertest';
import * as chai from 'chai';

const { expect } = chai;
const api = request('https://kasir-api.zelz.my.id');

let authToken;

describe('Kasir AJA API Tests', function() {

  // LOGIN (POST)
  it('should authenticate user and return a token', async function() {
    this.timeout(10000); 

    const response = await api.post('/authentications')
      .send({
        email: 'hajriansyah20@ex.com',
        password: 'hajriansyah20bWm@'
      });

    console.log(response.body); 
    expect(response.status).to.equal(201);
    expect(response.body.data).to.have.property('accessToken');
    authToken = response.body.data.accessToken;
    console.log('Auth Token:', authToken); 
  });

  // GET User Detail (GET)
  it('should retrieve user details', async function() {
    this.timeout(10000); 

    const userId = '6cb2d080-1b41-40fa-ab3b-d51178301946'; 
    const response = await api.get(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`);

    console.log(response.body); 
    expect(response.status).to.equal(200);
    expect(response.body.data.user).to.exist; 
    expect(response.body.data.user.name).to.equal('Toko hajriansyah20'); 
    expect(response.body.data.user.email).to.equal('hajriansyah20@ex.com'); 
  });

  // UPDATE User (PUT)
  it('should update user information', async function() {
    this.timeout(10000); 

    const userId = '6cb2d080-1b41-40fa-ab3b-d51178301946'; 
    const response = await api.put(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'kasir-fara74',
        email: 'fara74@example.com',
        password: 'fara74@'
      });

    console.log(response.body); 
    expect(response.status).to.equal(200);
    expect(response.body.data.name).to.equal('kasir-fara74');
  });

  // DELETE User (DELETE)
  it('should delete user successfully', async function() {
    this.timeout(10000); 

    const userId = '6cb2d080-1b41-40fa-ab3b-d51178301946'; 
    const response = await api.delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`);

    console.log(response.body); 
    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('User berhasil dihapus');
  });

});
