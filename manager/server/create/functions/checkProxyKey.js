import fetch from 'node-fetch';

export default async function checkProxyKey(key) {
  try {
    // Make a request to the proxy check API
    // http://v2.api.iphub.info/ip/8.8.8.8 with X-Key as the key
    const response = await fetch('http://v2.api.iphub.info/ip/8.8.8.8', {
      headers: {
        'X-Key': key,
      },
    });
    // Check for status code
    return response.status === 200;
  } catch (error) {
    console.log(error);
    return false;
  }
}
