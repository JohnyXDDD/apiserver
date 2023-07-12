const port = process.env.PORT || 3001
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()
const http=require('http')
const app = express()
app.use(cors({
    'origin':"*",
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
}))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next()
})
app.get('/hints', (req, res) => {
    const searchedLocation = req.query.searchedLocation
    const options = {
        method: 'GET',
        url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?includeDeleted=none&namePrefix=${searchedLocation}&limit=5&sort=-population`,
        headers: {
            'X-RapidAPI-Key': process.env.geoDbApi,
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    };
        
    axios.request(options).then(response => {
        res.json(response.data)
    }).catch (error=> {})
    
})
app.get('/weather', (req, res) => {
    const lat=req.query.lat
    const long=req.query.long
    const options = {
        method: 'GET',
        url: `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=minutely&appid=${process.env.weatherApi}&units=metric&lang=pl`
    }
    axios.request(options).then(response => {
        res.json(response.data)
    }).catch (error=> {})
    
})
app.listen(port,()=>console.log(`Server running on port ${port}`))
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
  });
