import { getBaseUrl } from "../../utils/envUtils";

export const postData = async (path, data) => {
  const baseUrl = getBaseUrl();

  console.log(`Making POST request to: ${baseUrl}/${path} with data:`, data);

  try {
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
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    if (!response.ok) {
      console.error('Response not OK:', responseData);
      throw new Error(responseData.message || 'An error occurred');
    }

    console.log('Parsed response data:', responseData);
    return responseData;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('Failed to fetch data');
  }
};
