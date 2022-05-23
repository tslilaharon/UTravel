// load the modules
const express = require(`express`)
const sql = require(`mssql`)
const config = require(`../utils/config`)
const path = require('path')
const fs = require('fs')

let usersRoute = express.Router()

const multer = require('multer')

const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: function (req, file, cb) {
    cb(null, "image-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage })


const nodemailer = require('nodemailer');

let newPassword = ""

// ---> forgot password
usersRoute.put('/forgotpassword', async (req, res) => {

  newPassword = await generatePassword()

  let body = req.body

  sql.on('error', (error) => res.send(error))

  let db = await sql.connect(config.db)

  let query = await db.request()
    .input(`Email`, sql.VarChar(50), body.Email)
    .input(`New_Password`, sql.NVarChar(50), newPassword)
    .output(`Status`, sql.VarChar(10))
    .execute(`Forgot_Password`)
  let data = query.output
  console.log(data)
  await db.close()

  if (data.Status == 'ok') {
    let send = sendMail(body.Email, newPassword)
    if (send.Status == 'ok') {
      res.send(data)
    }
  }
  else {
    res.send({ Status: 'error' })
  }

})

// פונקציה ליצירת סיסמא רנדומלית
const generatePassword = () => {
  return new Promise((resolve, reject) => {
    try {
      let length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
      for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
      }
      resolve(retVal);
    } catch (error) {
      reject('')
    }
  })
}


const sendMail = (Email, Password) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'utravel010@gmail.com',
        pass: 'avitslil10'
      }
    });

    let mailOptions = {
      from: 'utravel010@gmail.com',
      to: Email,
      subject: 'UTravel - Password reset',
      text: 'Your password was reset\n' +
        'Your new passowrd is \n' + Password + ' \nNow you can login with the new passowrd \n Thank you, UTravel Team'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        alert("The Email Sent !!")
      }
    });
    return { Status: 'ok' }
  } catch (error) {
    return { Status: 'error' }
  }
}


const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'utravel010@gmail.com',
    pass: 'avitslil10'
  }
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

usersRoute.post("/contact", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  const mail = {
    from: email,
    to: "utravel010@gmail.com",
    subject: "Contact Form Submission",
    html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});



//---> All Users
usersRoute.get(`/`, async (req, res) => {
  sql.on(`error`, (error) => res.send(error))

  let db = await sql.connect(config.db)

  let query = await db.request().execute(`SelectAllUsers`)

  let data = await query.recordset

  await db.close()

  res.send(data)
})

//---> Register
usersRoute.post(`/register`, async (req, res) => {
  let body = req.body

  sql.on('error', (error) => res.send(error))

  let db = await sql.connect(config.db)

  let query = await db.request()
    .input(`User_Name`, sql.NVarChar(50), body.User_Name)
    .input(`Email`, sql.VarChar(50), body.Email)
    .input(`Password`, sql.NVarChar(50), body.Password)
    .output(`User_id`, sql.Int)
    .execute(`RegisterUser`)

  let data = await query.recordset

  await db.close()

  res.send(data)
})

//---> Login
usersRoute.post('/login', async (req, res) => {

  let body = req.body

  sql.on('error', (error) => res.send(error))

  let db = await sql.connect(config.db)

  let query = await db.request()
    .input(`Email`, sql.VarChar(50), body.Email)
    .input(`Password`, sql.NVarChar(50), body.Password)
    .execute(`LoginUser`)

  let data = await query.recordset

  await db.close()

  res.send(data)
})

//---> Profile Details by user id
usersRoute.get('/:id', async (req, res) => {

  let params = req.params

  sql.on('error', (error) => res.send(error))

  let db = await sql.connect(config.db)

  let query = await db.request()
    .input(`User_id`, sql.Int, params.id)
    .execute(`Profile_Details`)

  let data = await query.recordset

  await db.close()

  res.send(data[0])
})

//---> Edit Profile Details by user id
usersRoute.put('/edit/:id', async (req, res) => {

  let params = req.params
  let body = req.body

  sql.on('error', (error) => res.send(error))

  let db = await sql.connect(config.db)

  let query = await db.request()
    .input(`User_id`, sql.Int, params.id)
    .input(`User_Name`, sql.NVarChar(150), body.User_Name)
    .input(`Email`, sql.VarChar(50), body.Email)
    .input(`Image`, sql.NVarChar, body.Image)
    .execute(`Edit_User`)

  let data = await query.recordset

  await db.close()

  res.send(data)
})

//---> Delete user by user id
usersRoute.delete('/delete/:id', async (req, res) => {

  let params = req.params

  sql.on(`error`, (error) => res.send(error))

  let db = await sql.connect(config.db)

  let query = await db.request()
    .input(`User_id`, sql.Int, params.id)
    .execute(`Delete_User`)

  let data = await query.recordset

  await db.close()

  res.send(data)
})


//---> reviews by user id
usersRoute.get('/reviews/:id', async (req, res) => {

  let params = req.params

  sql.on('error', (error) => res.send(error))

  let db = await sql.connect(config.db)

  let query = await db.request()
    .input(`User_Id`, sql.Int, params.id)
    .execute(`SelectReviewsByUser`)

  let data = await query.recordset

  await db.close()

  res.send(data)
})

//---> Paid Order by user id
usersRoute.get('/orders/:id', async (req, res) => {

  let params = req.params

  sql.on('error', (error) => res.send(error))

  let db = await sql.connect(config.db)

  let query = await db.request()
    .input(`User_Id`, sql.Int, params.id)
    .execute(`SelectUserPaidOrder`)

  let data = await query.recordset

  await db.close()

  res.send(data)
})


usersRoute.post("/upload", (req, res) => {
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

//export the router
module.exports = usersRoute