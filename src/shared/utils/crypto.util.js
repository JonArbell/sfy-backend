import bcrypt from "bcrypt";
const SALT_ROUNDS = 12;
const encode = async (text) => await bcrypt.hash(text, SALT_ROUNDS);
const decode = async (value, hashed) => await bcrypt.compare(value, hashed);
export default {
    encode,
    decode
};
