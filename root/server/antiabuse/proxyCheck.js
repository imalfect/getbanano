import fetch from 'node-fetch';
/* |--------------------------------------------------------------------| */
/* |   Faucets use iphub.info for proxy detection, which is optional.   | */
/* |         Each faucet owner has to supply their own API key.         | */
/* |--------------------------------------------------------------------| */

export async function proxyCheck(ip, key) {
  try {
    const check = await fetch(`https://v2.api.iphub.info/ip/${ip}`, {
      headers: {
        'X-Key': key,
      },
    });
    if (!check.ok) {
      throw new Error(`Failed proxy check with status ${check.status}`);
    } else {
      const json = await check.json();
      return !(json.block === 1);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}
