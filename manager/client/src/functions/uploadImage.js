import {toast} from 'react-hot-toast';

const clientId = '5b61e7a2e6195a7';
export async function uploadImage(file) {
  const uploadToast = toast.loading(`Uploading the image...`);
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: `Client-ID ${clientId}`,
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      toast.success(`Image uploaded successfully!`, {
        id: uploadToast,
      });
      return data.data.link; // This will contain the URL of the uploaded image.
    } else {
      toast.error(
          `Failed to upload image. Code: ${response.status}. Try again later`,
          {
            id: uploadToast,
          });
      throw new Error(`Failed to upload image to Imgur ${response.status}`);
    }
  } catch (error) {
    toast.error(
        `Failed to upload image. ${error}. Try again later`,
        {
          id: uploadToast,
        });
    console.error('Error uploading image to Imgur:', error);
    throw error;
  }
}
