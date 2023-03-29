import * as dotenv from 'dotenv';
dotenv.config();
/**
 * The JWT configuration
 */
const jwtConfig = {
  secret: process.env?.SECRET,
  signOptions: { expiresIn: '2h' }
};

export default jwtConfig;
