import axios from "axios";
 // Set config defaults when creating the instance
 console.log("check VITE_URL_Backend ", import.meta.env.VITE_BACKEND_URL)
const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
  });
  
  // Alter defaults after instance has been created
//   instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;


// format response data 
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error); 
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    // check inside response 
   
    if(response.data && response.data.data ){
        return response;
    }
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
     // if error thì response ra error từ phản hồi của backend
     if(error.response && error.response.data) {return error.response.data ;}
    return Promise.reject(error);
  });
export default instance ;