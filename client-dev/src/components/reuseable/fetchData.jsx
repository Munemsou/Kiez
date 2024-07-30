  export const postData = async (path, data) => {
    const baseUrl = import.meta.env.MODE === 'development'
      ? import.meta.env.VITE_API_URL_LOCAL
      : import.meta.env.VITE_API_URL_PROD;

    console.log(`Making POST request to: ${baseUrl}/${path} with data:`, data);

    const response = await fetch(`${baseUrl}/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    console.log('Received response:', response);

    const contentType = response.headers.get('content-type');
    let responseData;

    if (contentType && contentType.includes('application/json')) {
      try {
        responseData = await response.json();
      } catch (jsonError) {
        console.error('Failed to parse JSON response:', jsonError);
        throw new Error('Failed to parse response as JSON');
      }
    } else {
      try {
        responseData = await response.text();
      } catch (textError) {
        console.error('Failed to read text response:', textError);
        throw new Error('Failed to read response text');
      }
    }

    if (!response.ok) {
      console.error('Response not OK:', responseData);
      throw new Error(responseData.message || 'An error occurred');
    }

    console.log('Parsed response data:', responseData);
    return responseData;
  };
