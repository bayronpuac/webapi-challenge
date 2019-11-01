const express = require('express');
const helmet = require('helmet');
const server = express();
const projectRouter = require('./project');
const actionRouter = require('./actions');

// function logger(prefix){
//     return(req,res,next) => {
//       console.log(`${prefix} [${new Date().toISOString()}] ${req.method} to ${req.url}`);
//       next();
//     };


server.use(helmet());
server.use(express.json());
// server.use(logger);
server.use('/project', projectRouter);
server.use('/actions', actionRouter);


server.get('/', (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`)
   });

module.exports = server;