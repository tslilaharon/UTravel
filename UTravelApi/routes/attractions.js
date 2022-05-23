// load the modules
const express = require(`express`)
const sql = require(`mssql`)
const config = require(`../utils/config`)
const path = require('path')
const fs = require('fs')

let attractionsRoute = express.Router()

const multer = require('multer')

const storage = multer.diskStorage({
    destination: "public/uploads/",
    filename: function (req, file, cb) {
        cb(null, "image-" + Date.now() + path.extname(file.originalname));
    }
});

//---> All Attractions

attractionsRoute.get(`/`, async (req, res) => {
    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)

    // run a query
    let query = await db.request().execute(`SelectAllAttractions`)

    //get the data
    let data = await query.recordset

    //close the server
    await db.close()

    //send the data to the clinet via the api
    res.send(data)
})

//---> Add Attraction

attractionsRoute.post(`/add`, async (req, res) => {
    //get the request body
    let body = req.body

    sql.on('error', (error) => res.send(error))

    let db = await sql.connect(config.db)

    let query = await db.request()
        .input(`Attraction_Name`, sql.NVarChar(50), body.Attraction_Name)
        .input(`City_Name`, sql.NVarChar(50), body.City_Name)
        .input(`Address`, sql.NVarChar(50), body.Address)
        .input(`Open_Hour`, sql.NVarChar(50), body.Open_Hour)
        .input(`Close_Hour`, sql.NVarChar(50), body.Close_Hour)
        .input(`Rating`, sql.Float, body.Rating)
        .input(`Rating_Star`, sql.TinyInt, body.Rating_Star)
        .input(`Stock_Quantity`, sql.TinyInt, body.Stock_Quantity)
        .input(`In_Stock`, sql.Bit, body.In_Stock)
        .input(`Price`, sql.Float, body.Price)
        .input(`Category`, sql.NVarChar(50), body.Category)
        .input(`Title`, sql.NVarChar(50), body.Title)
        .input(`Information`, sql.NVarChar(200), body.Information)
        .input(`Image`, sql.NVarChar, body.Image)
        .input(`Business_Id`, sql.Int, body.Business_Id)
        .input(`City_Id`, sql.Int, body.City_Id)
        .output(`Attraction_Id`, sql.Int)
        .execute(`AddAttraction`)

    let data = await query

    await db.close()

    res.send(data)
})

//---> Attraction Details by Attraction id

attractionsRoute.get('/:id', async (req, res) => {

    //get the params from the requset
    let params = req.params

    sql.on('error', (error) => res.send(error))

    let db = await sql.connect(config.db)

    let query = await db.request()
        .input(`Attraction_Id`, sql.Int, params.id)
        .execute(`SelectAttractionsById`)

    let data = await query.recordset

    await db.close()


    res.send(data[0])
})

//---> Edit Attraction Details by Attraction id

attractionsRoute.put('/edit/:id', async (req, res) => {

    let params = req.params
    let body = req.body

    sql.on('error', (error) => res.send(error))

    let db = await sql.connect(config.db)

    let query = await db.request()
        .input(`Attraction_Id`, sql.Int, params.id)
        .input(`Attraction_Name`, sql.NVarChar(50), body.Attraction_Name)
        .input(`City_Name`, sql.NVarChar(50), body.City_Name)
        .input(`Address`, sql.NVarChar(50), body.Address)
        .input(`Open_Hour`, sql.NVarChar(50), body.Open_Hour)
        .input(`Close_Hour`, sql.NVarChar(50), body.Close_Hour)
        .input(`Rating`, sql.Float, body.Rating)
        .input(`Rating_Star`, sql.TinyInt, body.Rating_Star)
        .input(`Stock_Quantity`, sql.TinyInt, body.Stock_Quantity)
        .input(`In_Stock`, sql.Bit, body.In_Stock)
        .input(`Price`, sql.Float, body.Price)
        .input(`Category`, sql.NVarChar(50), body.Category)
        .input(`Title`, sql.NVarChar(50), body.Title)
        .input(`Information`, sql.NVarChar(200), body.Information)
        .input(`Image`, sql.NVarChar, body.Image)
        .execute(`Edit_Attraction`)

    let data = await query

    await db.close()

    res.send(data)
})

//---> Delete Attraction by Attraction id

attractionsRoute.delete('/delete/:id', async (req, res) => {

    let params = req.params

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)

    let query = await db.request()
        .input(`Attraction_Id`, sql.Int, params.id)
        .execute(`Delete_Attraction`)
    let data = await query

    await db.close()

    res.send(data)
})

//---> All reviews by Attraction

attractionsRoute.get('/reviews/:id', async (req, res) => {

    let params = req.params

    sql.on('error', (error) => res.send(error))

    let db = await sql.connect(config.db)

    let query = await db.request()
        .input(`Attraction_Id`, sql.Int, params.id)
        .execute(`SelectReviewsByAttraction`)

    let data = await query.recordset

    await db.close()

    res.send(data)
})

//---> Attraction Details by Attraction name
attractionsRoute.post('/search', async (req, res) => {

    let body = req.body

    sql.on('error', (error) => res.send(error))

    let db = await sql.connect(config.db)

    let query = await db.request()
        .input(`Attraction_Name`, sql.NVarchar(50), body.Attraction_Name)
        .execute(`SelectAttractionsByName`)

    let data = await query.recordset

    await db.close()


    res.send(data)
})

//---> All Attractions by category
attractionsRoute.post(`/category`, async (req, res) => {
    let body = req.body

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)

    let query = await db.request()
        .input(`Category`, sql.NVarchar(50), body.Category)
        .execute(`SelectAttractionsByCategory`)

    let data = await query.recordset

    await db.close()

    res.send(data)
})

attractionsRoute.post("/upload", (req, res) => {
    try {
        let body = req.body

        let data = body.photo.replace(/^data:image\/\w+;base64,/, '');
        let filename = `image_${Date.now()}.${body.photo.split(';')[0].split('/')[1]}`

        fs.writeFile(`public/uploads/${filename}`, data, {
            encoding: 'base64'
        }, function (err) {
        });

        let fullUrl = req.protocol + '://' + req.get('host');
        res.send({ img: `${fullUrl}/public/uploads/${filename}` });

    } catch (error) {
        res.send(error)
        console.log("error", error)
    }
})

// update the stock back after cancel order
attractionsRoute.put('/UpdateStock/:id', async (req, res) => {

    let params = req.params

    let body = req.body

    sql.on('error', (error) => res.send(error))

    let db = await sql.connect(config.db)

    let query = await db.request()
        .input(`Attraction_Id`, sql.Int, params.id)
        .input(`Stock_Quantity`, sql.TinyInt, body.Stock_Quantity)
        .execute(`UpdateStockAfterDelete`)

    let data = await query

    await db.close()

    res.send(data)
})

//export the router
module.exports = attractionsRoute