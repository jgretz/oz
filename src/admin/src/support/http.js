// import
import axios from 'axios';
import { ROOT_URL } from 'constants';

// export
export default class Http {
  url(relativeUrl) {
    return `${ROOT_URL}/${relativeUrl}`;
  }

  get(relativeUrl) {
    return axios.get(this.url(relativeUrl));
  }

  put(relativeUrl, body) {
    return axios.put(this.url(relativeUrl), body);
  }

  post(relativeUrl, body) {
    return axios.post(this.url(relativeUrl), body);
  }

  postFile(relativeUrl, data) {
    return axios.post(this.url(relativeUrl), data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }

  delete(relativeUrl) {
    return axios.delete(this.url(relativeUrl));
  }
}
