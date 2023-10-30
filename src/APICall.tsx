import axios from 'axios';

const dataURL = 'http://localhost:5201';


export async function makeApiCall(apiURL: string, data: object, method: string, params?: object): Promise<any> {
  const axiosConfig = {
    method: method, // Use 'post' method for POST request
    url: dataURL + apiURL, // Combine dataURL and apiURL
    headers: {
      'Content-Type': 'application/json', // Specify the content type as JSON
    },
    params: params ? params: {},
    data: data, // Set the request data
    withCredentials: true, // Enable credentials in the request
  };

  try {
    const response = await axios(axiosConfig);
    return response.data;
  } catch (error: any) {

    if (error.response && error.response.status === 400) {
      // Handle the 400 response here
      return error.response.data;
    }

    throw new Error('Axios error: ' + error );
  }
}