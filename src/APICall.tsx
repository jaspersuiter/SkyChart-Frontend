// APIcall.ts

// Define the API endpoint URL
const dataURL = 'http://localhost:5201';

// Data to send in the request body
const data = {
  name: 'John Doe', // Replace 'John Doe' with the desired name
};

// Configure the fetch options for a POST request
const requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', // Specify the content type as JSON
  },
  body: JSON.stringify(data), // Convert data to JSON format
};

export async function makeApiCall(apiURL: string, requestOptions: object): Promise<any> {
  try {
    const response = await fetch(dataURL+ apiURL, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error('Fetch error: ' + error);
  }
}