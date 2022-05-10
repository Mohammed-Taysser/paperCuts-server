
# notes

token column

  userId
  token(UUID)
  registerTime
  accountStatusCode
  isVerified

OR

on fly token

  hash(username + API_KEY + password + email or registerTime)

site.com/active/encryptedId/hashCode

## todo

- send email on password change

## request security (express.js)

- <https://www.npmjs.com/package/raw-body>
- <https://www.npmjs.com/package/csurf>
- <https://www.npmjs.com/package/hpp>
- <https://www.npmjs.com/package/helmet>
- <https://www.npmjs.com/package/cors>
- <https://www.npmjs.com/package/jsonwebtoken>
- <https://www.npmjs.com/package/express-session>
- <https://www.npmjs.com/package/universal-cookie>
- <https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html>

## 10 May 2022

- init release
