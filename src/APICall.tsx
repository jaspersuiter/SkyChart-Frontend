import axios from 'axios';

const dataURL = 'http://localhost:5201';


export async function makeApiCall(apiURL: string, data: object, method: string): Promise<any> {
  const axiosConfig = {
    method: method, // Use 'post' method for POST request
    url: dataURL + apiURL, // Combine dataURL and apiURL
    headers: {
      'Content-Type': 'application/json', // Specify the content type as JSON
    },
    data: data, // Set the request data
    withCredentials: true, // Enable credentials in the request
  };

  try {
    const response = await axios(axiosConfig);

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    return response.data;
  } catch (error) {
    throw new Error('Axios error: ' + error);
  }
}