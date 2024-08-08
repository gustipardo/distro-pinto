

interface AddEntityParams {
  name: string;
  type: string;
}

export const addEntity = async ({name, type}: AddEntityParams) => {

  console.log(`Fetching: name`, name, `type`, type);
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/entities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, type})
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return error;
  }

}