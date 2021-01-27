const express = require('express');
const search = require('./utils/search')
const app = express();
const path = require('path');

// add required headers to allow api calls
app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
})

app.use("assets", express.static(path.join(__dirname, "assets")));
app.use("/", express.static(path.join(__dirname, "angular")));

// handle request coming
app.get('/api/response', (req,res) => {

  // check if query has valid seach terms
  if(!req.query.searchTerm){
      return res.send({
          error:'Provide a search term',
      })
  }

  // send request to unsplash api
  search(req.query.searchTerm, req.query.orientation, req.query.page, 30, (error, returnedData) => {

      // if call returns an error, return the error
      if(error){
        return res.send({
          error: true,
      })
      }

      // return data if api call was succesful
      var data;
      data = returnedData;

      res.status(200).send(data);

  })
})

// load index.html file to user interface when loading, if not set. 
app.use((req,res,next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
});

module.exports = app;
