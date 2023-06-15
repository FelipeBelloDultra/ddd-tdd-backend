console.log(process.env.APP_JWT_AUTH_CREDENTIAL);

export default {
  secret: process.env.APP_JWT_AUTH_CREDENTIAL || "default",
  expiresIn: process.env.APP_JWT_AUTH_EXPIRES_IN || "1h",
};
