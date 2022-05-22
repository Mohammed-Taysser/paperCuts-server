
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

## [Deploy to heroku](https://www.freecodecamp.org/news/how-to-deploy-your-site-using-express-and-heroku/)

### Setting up

You'll need to have:

- Node and npm installed on your local machine (read how to do this [here](https://nodejs.org/en/download/))
- Git installed (read this [guide](https://www.atlassian.com/git/tutorials/install-git))
- The Heroku CLI installed ([here's how to do it](https://devcenter.heroku.com/articles/heroku-cli#download-and-install))

### Login to the Heroku CLI and create a new project

There are two options here. The default is for Heroku to let you login through the web browser. Adding the `-i` flag lets you login through the command line.

```shell
heroku login -i
```

Now, you can create a new Heroku project. I called mine `papercuts-server`

```shell
heroku create papercuts-server
```

Make Sure Provide `.env` With Needed Config

### Create a Procfile

Heroku will need a Procfile to know how to run your app.

```shell
echo "web: node app.js" > Procfile
```

Notice that the Procfile has no file extension

### Add and commit files to Git

```shell
git add .
git commit -m "ready to deploy"
```

The final step is to push to your Heroku main branch.

```shell
git push heroku main
```

You should see the command line print out a load of information as Heroku builds and deploys your app.

The line to look for is: **`Verifying deploy... done.`**

## Contribution 🤝

1. Fork it!
2. Create your feature branch: git checkout -b feature-name
3. Commit your changes: git commit -am 'Some commit message'
4. Push to the branch: git push origin feature-name
5. Submit a pull request 😉😉

## License 📜

MIT © Mohammed Taysser

[live-demo]: <https://papercuts-server.herokuapp.com/>
