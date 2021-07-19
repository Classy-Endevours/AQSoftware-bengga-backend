require('dotenv').config({path: __dirname + '/.env'})
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port= process.env.PORT || 4000;
const loginRoute = require('./routes/auth');
const scoreRoute = require('./routes/score');
const leaderboardRoute = require('./routes/leaderboard');
const schedulerRoute = require('./routes/scheduler');
const engagementRoute = require('./routes/engagement');
const Sentry = require('@sentry/node');
const Tracing = require("@sentry/tracing");
const middleware = require('./utils/middleware');
const db = require("./models");

require('./utils/passport');

Sentry.init({
	dsn: process.env.SENTRY_DSN,
	integrations: [
		new Sentry.Integrations.Http({ tracing: true }),
		new Tracing.Integrations.Express({ app }),
	],

	tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(cors());
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
);
app.use(bodyParser.json());

app.use('/api/v1/player', loginRoute);

app.use('/api/v1/player', middleware.hashMiddleware(), scoreRoute);

app.use('/api/v1/player', middleware.hashMiddleware(), leaderboardRoute);

app.use('/api/v1/player', middleware.hashMiddleware(), schedulerRoute);

app.use('/api/v1/player', middleware.hashMiddleware(), engagementRoute);

app.listen(port, () => {
    console.log('Server is up and running on port', port);
})