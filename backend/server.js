// Modules 
require('dotenv').config();
const express           = require('express');
const cors              = require('cors');
const bodyParser        = require('body-parser');
const mongoose          = require('mongoose');
const Joi               = require('joi');
const { getCharacter }  = require('rickmortyapi');







// Setup 

const app = express();

mongoose.connect('mongodb://mongo_database:27017/rickmorty', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('DB connected');
});

// Middlewares
app.use(cors());  // Allow cross origin requests
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.json());

// server 
const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || 4000;



app.post('/api/login', (req, res) => {
    res.status(200).send(`Hello World! Our server is running at port ${port}`);
});

app.post('/api/signup', (req, res) => {
    
    console.log(req.body);

    const schema = Joi.object({
        username: Joi.string()
            .min(3)
            .max(50)
            .required(),
        
        email: Joi.string()
        .email()
        .required(),

        password: Joi.string()
        .alphanum()
        .min(3)
        .required()
    });

    try {
        // const value = await schema.validateAsync({ username: 'abc', birth_year: 1994 });
        const value =  schema.validate({ username: req.body.username, email: req.body.email, password:  req.body.password});
        if(!value.error.details){

        }
        res.status(200).json(value);
    }
    catch (err) {
        return res.json(err);
     }
   
    
   
});


app.get('/api/login', (req, res) => {
    
    
    
    res.status(200).send(`Hello World! Our server is running at port ${port}`);
});

app.get('/api/characters', async (req, res) => {
    try {
        const chars = await getCharacter();
        //console.log(chars);
        res.status(200).send(chars); 
    } catch (error) {
        return res.status(500).json({'msg': error.message});
    }
    
});

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});