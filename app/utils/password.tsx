import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const saltAndHashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  console.log(password);
  console.log(hash)
  return bcrypt.compare(password, hash);
};
