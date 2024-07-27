/**
 * Sends a POST request to the server with the provided path and data.
 * 
 * @param {string} path - The endpoint path to which the request is sent.
 * @param {Object} data - The data to be sent in the request body.
 * @returns {Promise<Object>} - The response data from the server.
 * @throws {Error} - Throws an error if the request fails or times out.
 */
export const postData = async (path, data) => {
  // Determine the base URL based on the environment
  // If in development mode, use the local URL; otherwise, use the production URL
  const baseUrl = process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_API_URL_LOCAL
    : process.env.REACT_APP_API_URL_PROD;

  // Log the URL and data for debugging purposes
  console.log(`POST request to: ${baseUrl}/${path}`);
  console.log('Data:', data);

  // Set up a timeout for the request (5 seconds in this case)
  const timeout = 5000; // Timeout in milliseconds
  const controller = new AbortController(); // Create a new AbortController instance
  const id = setTimeout(() => controller.abort(), timeout); // Abort request if it takes too long

  try {
    // Perform the fetch request
    const response = await fetch(`${baseUrl}/${path}`, {
      method: "POST", // HTTP method
      headers: {
        "Content-Type": "application/json", // Content type of the request body
      },
      credentials: "include", // Include cookies with the request
      body: JSON.stringify(data), // Convert data object to JSON
      signal: controller.signal, // Attach the abort signal to the request
    });

    // Clear the timeout since the request was successful
    clearTimeout(id);

    // Log the response status for debugging purposes
    console.log('Response status:', response.status);

    // Check if the response is not OK (status outside the range 200-299)
    if (!response.ok) {
      // Parse and log the error data from the response
      const errorData = await response.json();
      console.error('Error:', errorData);
      // Throw an error with a message from the response or a default message
      throw new Error(errorData.message || 'An error occurred');
    }

    // Parse the response data as JSON
    const responseData = await response.json();
    // Log the response data for debugging purposes
    console.log('Response data:', responseData);
    // Return the parsed response data
    return responseData;
  } catch (error) {
    // Handle errors that occur during fetch or due to request timeout
    if (error.name === 'AbortError') {
      console.error('Fetch request timed out'); // Specific message for timeout errors
    } else {
      console.error('Fetch error:', error); // Log other errors
    }
    // Rethrow the error to be handled by the calling code
    throw error;
  }
};
