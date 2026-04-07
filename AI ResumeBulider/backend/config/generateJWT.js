import jwt from 'jsonwebtoken';

function generateAccessToken(id) {
  const payload = { id };
  const secretKey = process.env.SECRET_KEY;
  const options = { expiresIn: '1h' }; // Changed from 1m to 1h for testing

  const token = jwt.sign(payload, secretKey, options);

  return token;
}

function generateRefreshToken(id){
  const payload = {id};
  const refreshSecretKey = process.env.REFRESH_SECRET_KEY;
  const options = { expiresIn: '15d' };

  const refreshToken = jwt.sign(payload, refreshSecretKey, options );

  return refreshToken;
}

export { generateAccessToken, generateRefreshToken };
