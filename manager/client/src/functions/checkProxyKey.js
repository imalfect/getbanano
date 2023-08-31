import config from '../config.json';
export async function checkProxyKey(key) {
  console.log('key is', key);
  const request = await fetch(
      `${config.managerApi}/api/checkProxyKey?key=${key}`,
  ).then((res) => res.json());
  return request.valid === true;
}
