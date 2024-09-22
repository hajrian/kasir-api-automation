const request = require('supertest');
const api = request('https://kasir-api.zelz.my.id');

/**
 * Fungsi untuk mendapatkan token autentikasi
 * @returns {Promise<string>} authToken
 */
async function getAuthToken() {
  try {
    const response = await api.post('/authentications')
      .send({
        email: 'hajriansyah20@ex.com', 
        password: 'hajriansyah20bWm@'  
      });

    if (response.status === 201 && response.body.data.accessToken) {
      return response.body.data.accessToken; 
    } else {
      throw new Error('Gagal autentikasi, periksa kredensial Anda.');
    }
  } catch (error) {
    console.error('Error saat mendapatkan token:', error.message);
    throw error;
  }
}

module.exports = { getAuthToken };
