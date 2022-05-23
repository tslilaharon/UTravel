// load the modules
const express = require(`express`)
const sql = require(`mssql`)
const config = require(`../utils/config`)

let ordersRoute = express.Router()

// get all orders
ordersRoute.get(`/`, async (req, res) => {
    
    sql.on(`error`, (error) => res.send(error))

    
    let db = await sql.connect(config.db)

    
    let query = await db.request().execute(`SelectAllOrders`)

    
    let data = await query.recordset

    
    await db.close()

    
    res.send(data)
})


//---> Add order
ordersRoute.post(`/add`, async (req, res) => {
    let body = req.body

    
    sql.on('error', (error) => res.send(error))

    let db = await sql.connect(config.db)

    let query = await db.request()
        .input(`User_Id`, sql.Int, body.User_Id)
        .input(`Total_Price`, sql.Float, body.Total_Price)
        .input(`Order_Info`, sql.NVarChar(50), body.Order_Info)
        .output(`Order_Id`, sql.Int)
        .execute(`AddOrder`)

    let data = await query.recordset

    await db.close()

    res.send(data)
})

//---> update order Details by id
ordersRoute.put('/update/:id', async (req, res) => {

    let params = req.params

    let body = req.body

    
    sql.on('error', (error) => res.send(error))

    
    let db = await sql.connect(config.db)

    let query = await db.request()
        .input(`Order_Id`, sql.Int, params.id)
        .input(`User_Id`, sql.Int, body.User_Id)
        .input(`Paid`, sql.Bit, body.Paid)
        .input(`Total_Price`, sql.Float, body.Total_Price)
        .input(`Order_Info`, sql.NVarChar(200), body.Order_Info)
        .input(`IsActive`, sql.Bit, body.IsActive)
        .execute(`Update_Order`)

    let data = await query.recordset

    await db.close()

    res.send(data)
})
//---> Active order update by id

ordersRoute.put('/active/:id', async (req, res) => {
    
    let params = req.params

    
    let body = req.body

    
    sql.on('error', (error) => res.send(error))

    
    let db = await sql.connect(config.db)

    let query = await db.request()
        .input(`Order_Id`, sql.Int, params.id)
        .execute(`Active_Order`)

    let data = await query.recordset

    await db.close()

    res.send(data)
})

//---> Delete order by id
ordersRoute.delete('/delete/:id', async (req, res) => {

    let params = req.params

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)

    let query = await db.request()
        .input(`Order_Id`, sql.Int, params.id)
        .execute(`Delete_Order`)

    let data = await query.recordset

    await db.close()

    res.send(data)
})


//---> Cancel order by id
ordersRoute.put('/cancel/:id', async (req, res) => {

    
    let params = req.params

    
    let body = req.body

    
    sql.on('error', (error) => res.send(error))

    
    let db = await sql.connect(config.db)

    let query = await db.request()
        .input(`Order_Id`, sql.Int, params.id)
        .execute(`Cancel_Order`)

    let data = await query.recordset

    await db.close()

    res.send(data)
})

//---> Update Paid order by id
ordersRoute.put('/paid/:id', async (req, res) => {

    
    let params = req.params

    
    let body = req.body

    
    sql.on('error', (error) => res.send(error))

    
    let db = await sql.connect(config.db)

    let query = await db.request()
        .input(`Order_Id`, sql.Int, params.id)
        .input(`Paid`, sql.Bit, body.Paid)
        .execute(`UpdatePaid`)

    let data = await query.recordset

    await db.close()

    res.send(data)
})

//---> Select Order Details by id

ordersRoute.get('/:id', async (req, res) => {

    
    let params = req.params

    
    sql.on('error', (error) => res.send(error))

    
    let db = await sql.connect(config.db)

    let query = await db.request()
        .input(`Order_Id`, sql.Int, params.id)
        .execute(`SelectOrder`)

    let data = await query.recordset

    await db.close()

    res.send(data[0])
})

//export the router
module.exports = ordersRoute