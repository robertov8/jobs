const axios = require('axios');

const api = axios.create({
  baseURL: 'https://api.github.com/repos',
});

module.exports = api;
