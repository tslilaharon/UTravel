// load the modules
const express = require(`express`)
const sql = require(`mssql`)
const config = require(`../utils/config`)

let reviewsRoute = express.Router()

//---> Add review

reviewsRoute.post(`/add`, async (req, res) => {
    let body = req.body

    sql.on('error', (error) => res.send(error))

    let db = await sql.connect(config.db)

    let query = await db.request()
        .input(`User_Id`, sql.Int, body.User_Id)
        .input(`Attraction_Id`, sql.Int, body.Attraction_Id)
        .input(`Rating_Star`, sql.TinyInt, body.Rating_Star)
        .input(`Content`, sql.NVarChar(200), body.Content)
        .output(`Review_Id`, sql.Int)
        .execute(`AddReview`)

    let data = await query.recordset

    await db.close()

    res.send(data)
})

//---> Edit review Details by review id

reviewsRoute.put('/edit/:id', async (req, res) => {

    let params = req.params

    let body = req.body

    sql.on('error', (error) => res.send(error))

    let db = await sql.connect(config.db)

    let query = await db.request()
        .input(`Review_Id`, sql.Int, params.id)
        .input(`Rating_Star`, sql.TinyInt, body.Rating_Star)
        .input(`Content`, sql.NVarChar(200), body.Content)
        .execute(`Edit_Review`)

    let data = await query.recordset

    await db.close()

    res.send(data)
})

//---> Delete review by review id

reviewsRoute.delete('/delete/:id', async (req, res) => {

    let params = req.params

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)

    let query = await db.request()
        .input(`Review_Id`, sql.Int, params.id)
        .execute(`Delete_Review`)

    let data = await query.recordset

    await db.close()

    res.send(data)
})

//---> Edit review Details by review id

reviewsRoute.post('/rating', async (req, res) => {

    let body = req.body

    sql.on('error', (error) => res.send(error))

    let db = await sql.connect(config.db)

    let query = await db.request()
        .input(`Rating_Star`, sql.TinyInt, body.Rating_Star)
        .execute(`SelectReviewsByRating`)

    let data = await query.recordset

    await db.close()

    res.send(data)
})

reviewsRoute.get('/attraction_rating/:id', async (req, res) => {

    let params = req.params

    sql.on('error', (error) => res.send(error))

    let db = await sql.connect(config.db)

    let query = await db.request()
        .input(`Attraction_Id`, sql.Int, params.id)
        .execute(`Attraction_Rating`)

    let data = await query.recordset

    await db.close()

    res.send(data)
})

//export the router
module.exports = reviewsRoute