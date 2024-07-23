export const postDate = async (path, data) => {
  const response = await fetch(`http://localhost:5500/${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return await response.json();
};
