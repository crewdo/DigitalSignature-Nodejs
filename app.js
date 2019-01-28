const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser');
const keypair = require('keypair');
const keyconfig = require('./config/config');
const handle = require('./controller/handle')


const port = 3000


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());

let urlencodedParser = bodyParser.urlencoded({ extended: false })
let pair = keypair();
    console.log(pair.public);
    console.log(pair.private);
    keyconfig.set('publickey', pair.public);
    keyconfig.set('privatekey', pair.private);


app.set('view engine', 'ejs');
app.set('views', './views');
//ROUTE
app.get("/", function (req, res) {
    res.render('home', {public:keyconfig.get('publickey')});
});


app.get("/check", function (req, res) {
    res.render('check',{public:keyconfig.get('publickey'),  signature:keyconfig.get('signature'), message:keyconfig.get('message')
    });
});
app.post('/', urlencodedParser, handle.generateSignature);
app.post('/check', urlencodedParser, handle.checkMessage);

