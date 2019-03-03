import axios from 'axios';

const searchGiphy = ({q, limit, offset}) => {
  return new Promise((resolve, reject) => {
    const base_url = "https://api.giphy.com/v1/gifs/search";
    const params = [
      "api_key=CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6&",
      `q=${q}`,
      `limit=${limit}`,
      `offset=${offset}`,
      "rating=G",
      "lang=en",
    ];

    const url = `${base_url}?` + params.join("&");

    axios.get(url)
      .then(function (response) {
        resolve({items: response.data.data});
      })
      .catch(function (error) {
        // handle error
        reject(error);
      });
  });
};

export { searchGiphy };