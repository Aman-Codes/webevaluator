import axios from "axios";

export const sendPostRequest = (url, data) =>
  axios({
    method: "POST",
    url,
    data,
  })
    .then((response) => {
      console.log("response is", response);
      return response;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });

export const sendPostRequestSetter = (url, postData, setValue) =>
  axios({
    method: "POST",
    url,
    data: postData,
  })
    .then(({ data }) => {
      console.log("data is", data);
      setValue(data);
      return data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });

export const sendSslPostRequestSetter = (url, postData, setValue) =>
  axios({
    method: "POST",
    url,
    data: postData,
  })
    .then(({ data }) => {
      console.log("data is", data);
      console.log("ssl is", data[Object.keys(data)[0]]);
      setValue(data[Object.keys(data)[0]]);
      return data[Object.keys(data)[0]];
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });

export const sendGetRequest = (url) =>
  axios({
    method: "POST",
    url,
  })
    .then((response) => {
      console.log("response is", response);
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
