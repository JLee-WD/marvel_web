const fetchDataFromApi = async (props) => {
  const { endpoint, params } = props;
  const urlParams = new URLSearchParams(params);

  try {
    const response = await fetch(`/api/${endpoint}?${urlParams.toString()}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

export default fetchDataFromApi;