export const postDate = async (path, data) => {
  const baseUrl = process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_API_URL_LOCAL
    : process.env.REACT_APP_API_URL_PROD;

  console.log(`POST request to: ${baseUrl}/${path}`);
  console.log('Data:', data);

  try {
    const response = await fetch(`${baseUrl}/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error:', errorData);
      throw new Error(errorData.message || 'An error occurred');
    }

    const responseData = await response.json();
    console.log('Response data:', responseData);
    return responseData;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
