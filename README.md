
# [paperCuts API][live-demo]

this is REST APIs with ES6 and Express for [paperCuts](http://papercuts.vercel.app/) project instead of [`json-server`](https://www.npmjs.com/package/json-server) package

For [live demo][live-demo]

- CORS support via cors
- Body Parsing via body-parser
- use Mongoose to interact with mongodb
- Supports authentication using jsonwebtoken.
- JavaScript code linting is done using ESLint.
- Helmet helps secure Express apps by setting various HTTP headers.
- Has `.editorconfig` which helps developers define and maintain consistent coding styles between different editors and IDEs.

## Quick start 🚀

In order to run the project setup `.env` and set `MONGO_URL` variable equal to DB connection string.

In order to avoid port collision, the default port is `8080`. you can change it also in `.env` see [.env.example](.env.example).

For `JWT_SECRET_KEY` use long, complex and unguessable string value see <https://allkeysgenerator.com/> for get strong one

```shell
# Download the files from https://github.com/Mohammed-Taysser/paperCuts-server/releases or clone it with git version control:
git clone https://github.com/Mohammed-Taysser/paperCuts-server.git

# change directory
cd paperCuts-server

# Make it your own
rm -rf .git && git init && npm init

# Install dependencies
npm install

# Create .env
mv .env.example .env

# Start The Development Server by one of the following
npm start
# OR
node index.js
```

## Further reading 📖

- [Nodejs_Security_Cheat_Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html)

### Useful packages 🔭

for secure request

- [cors](https://www.npmjs.com/package/cors)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
- [csurf](https://www.npmjs.com/package/csurf)
- [hpp](https://www.npmjs.com/package/hpp)
- [helmet](https://www.npmjs.com/package/helmet)
- [raw-body](https://www.npmjs.com/package/raw-body)
- [express-session](https://www.npmjs.com/package/express-session)
- [universal-cookie](https://www.npmjs.com/package/universal-cookie)
- [react-google-login](https://www.npmjs.com/package/react-google-login)

## Contribution 🤝

1. Fork it!
2. Create your feature branch: git checkout -b feature-name
3. Commit your changes: git commit -am 'Some commit message'
4. Push to the branch: git push origin feature-name
5. Submit a pull request 😉😉

## License 📜

MIT © Mohammed Taysser

[live-demo]: <https://papercuts-server.onrender.com/>
