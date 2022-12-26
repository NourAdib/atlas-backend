import * as dotenv from 'dotenv';
dotenv.config();

const jwtConfig = {
  secret: process.env?.SECRET,
  signOptions: { expiresIn: '2h' }
};

export default jwtConfig;
