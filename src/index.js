const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const route = require('./routes');
const db = require('./config/db');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');


// Connect to DB
db.connect();

const app = express();
const port = 3000;

//Session for registry
require('./config/passport');
app.use(session({
    secret: 'adsa897adsa98bs',
    resave: false,
    saveUninitialized: false,
    }))
app.use(flash());
app.use(passport.initialize())
app.use(passport.session());

// Use static folder
app.use(express.static(path.join(__dirname, 'public')));
//gửi từ form lên server
app.use(
    express.urlencoded({
        extended: true,
    }),
);
//XMLHttpRequest,fetch, axios
//gửi từ code javascirpt lên server
app.use(express.json());

//dùng để chỉnh form từ post sang put
app.use(methodOverride('_method'));

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
