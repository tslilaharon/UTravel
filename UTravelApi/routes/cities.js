// load the modules
const express = require(`express`)
const sql = require(`mssql`)
const config = require(`../utils/config`)

let citiesRoute = express.Router()

//---> Add cities

citiesRoute.post(`/add`, async (req, res) => {
    
    let body = req.body

    
    sql.on('error', (error) => res.send(error))

    let db = await sql.connect(config.db)

    let query = await db.request()
        .input(`City_Name`, sql.NVarChar(50), body.City_Name)
        .input(`Country`, sql.NVarChar(50), body.Country)
        .input(`Title`, sql.NVarChar(50), body.Title)
        .input(`Information`, sql.NVarChar(200), body.Information)
        .input(`language`, sql.NVarChar(50), body.language)
        .input(`Currency`, sql.NVarChar(50), body.Currency)
        .input(`Weather`, sql.NVarChar(50), body.Weather)
        .input(`Rating_Star`, sql.TinyInt, body.Rating_Star)
        .input(`Image`, sql.NVarChar, body.Image)
        .output(`City_Id`, sql.Int)
        .execute(`AddCity`)

    let data = await query

    await db.close()

    res.send(data)
})

//---> All cities

citiesRoute.get(`/`, async (req, res) => {
    
    sql.on(`error`, (error) => res.send(error))

    // התחברות למסד הנתונים
    let db = await sql.connect(config.db)

    // run a query
    let query = await db.request().execute(`SelectAllCities`)

    //get the data
    let data = await query.recordset

    //close the server
    await db.close()

    //send the data to the clinet via the api
    res.send(data)
})

//---> cities Details by cities id

citiesRoute.get('/:id', async (req, res) => {

    
    let params = req.params

    
    sql.on('error', (error) => res.send(error))

    
    let db = await sql.connect(config.db)

    
    let query = await db.request()
        .input(`City_Id`, sql.Int, params.id)
        .execute(`SelectCityById`)

    let data = await query.recordset

    await db.close()

    
    res.send(data[0])
})

//---> Edit cities Details by cities id

citiesRoute.put('/edit/:id', async (req, res) => {

     params
    let params = req.params

     body
    let body = req.body

    
    sql.on('error', (error) => res.send(error))

    
    let db = await sql.connect(config.db)

    
    let query = await db.request()
        .input(`City_Id`, sql.Int, params.id)
        .input(`City_Name`, sql.NVarChar(50), body.City_Name)
        .input(`Country`, sql.NVarChar(50), body.Country)
        .input(`Title`, sql.NVarChar(50), body.Title)
        .input(`Information`, sql.NVarChar(200), body.Information)
        .input(`language`, sql.NVarChar(50), body.language)
        .input(`Currency`, sql.NVarChar(50), body.Currency)
        .input(`Weather`, sql.NVarChar(50), body.Weather)
        .input(`Rating_Star`, sql.TinyInt, body.Rating_Star)
        .input(`Image`, sql.NVarChar, body.Image)
        .execute(`Edit_City`)

    let data = await query

    await db.close()

    res.send(data)
})

//---> Delete City by City id

citiesRoute.delete('/delete/:id', async (req, res) => {

    let params = req.params

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)

    let query = await db.request()
        .input(`City_Id`, sql.Int, params.id)
        .execute(`Delete_City`)

    let data = await query

    await db.close()

    res.send(data)
})

//---> city attractions by city id

citiesRoute.get('/attractions/:id', async (req, res) => {

    
    let params = req.params

    
    sql.on('error', (error) => res.send(error))

    
    let db = await sql.connect(config.db)

    
    let query = await db.request()
        .input(`City_Id`, sql.Int, params.id)
        .execute(`SelectAttractionsByCityId`)

    let data = await query.recordset

    await db.close()

    
    res.send(data)
})


//---> cities Details by cities name
citiesRoute.post('/cityname', async (req, res) => {

    
    let body = req.body

    
    sql.on('error', (error) => res.send(error))

    
    let db = await sql.connect(config.db)

    
    let query = await db.request()
        .input(`City_Name`, sql.NVarChar(50), body.City_Name)
        .execute(`SelectCityByCityName`)

    let data = await query.recordset

    await db.close()

    
    res.send(data)
})


//export the router
module.exports = citiesRoute