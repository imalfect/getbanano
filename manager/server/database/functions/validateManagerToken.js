import {ManagerTokenModel} from '../schemas/managerToken.js';
import bcrypt from 'bcrypt';

export async function validateManagerToken(token, faucet) {
  // Find all tokens for the faucet
  const tokens = await ManagerTokenModel
      .find({faucet: faucet})
      .distinct(
          'token',
      );

  // Use Promise.all to parallelize token validation
  const validationPromises = tokens.map(async (storedToken) => {
    return await bcrypt.compare(token, storedToken);
  });

  // Wait for all promises to resolve
  const results = await Promise.all(validationPromises);

  // Check if any token was valid
  return results.some((valid) => valid);
}
