import axios from 'axios';

export default axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/' + process.env.REACT_APP_ELEVENIA_BASE_URL,
  headers: {
    contenttype: 'application/xml',
    acceptcharset: 'utf-8',
    openapikey: process.env.REACT_APP_ELEVENIA_API_KEY
  }
});