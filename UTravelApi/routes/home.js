// load the modules
const express = require(`express`)
const sql = require(`mssql`)
const config = require(`../utils/config`)

let homeRoute = express.Router()

//---> Select Top Three Cities

homeRoute.get('/topthree', async (req, res) => {
    
    sql.on('error', (error) => res.send(error))

    
    let db = await sql.connect(config.db)

    
    let query = await db.request()
        .execute(`Top3Cities`)

    let data = await query.recordset

    await db.close()

    res.send(data)
})

//---> Select Popular Destinations

homeRoute.get('/popular', async (req, res) => {
    
    sql.on('error', (error) => res.send(error))

    
    let db = await sql.connect(config.db)

    
    let query = await db.request()
        .execute(`PopularDestinations`)

    let data = await query.recordset

    await db.close()

    res.send(data)
})

//---> Select Best Sellers

homeRoute.get('/sellers', async (req, res) => {
    
    sql.on('error', (error) => res.send(error))

    
    let db = await sql.connect(config.db)

    
    let query = await db.request()
        .execute(`BestSellers`)

    let data = await query.recordset

    await db.close()

    res.send(data)
})

//---> Select Best Deals

homeRoute.get('/deals', async (req, res) => {
    
    sql.on('error', (error) => res.send(error))

    
    let db = await sql.connect(config.db)

    
    let query = await db.request()
        .execute(`BestDeals`)

    let data = await query.recordset

    await db.close()

    res.send(data)
})

//export the router
module.exports = homeRoute