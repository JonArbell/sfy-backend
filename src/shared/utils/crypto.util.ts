import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

const encode = async (text: string) => await bcrypt.hash(text, SALT_ROUNDS);

const decode = async (value: string, hashed: string) =>
  await bcrypt.compare(value, hashed);

const randomUUID = () => crypto.randomUUID();

export default {
  randomUUID,
  encode,
  decode,
};
