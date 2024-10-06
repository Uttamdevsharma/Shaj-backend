const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://final-libaba-client.vercel.app'],
  credentials: true
}))
app.use(cookieParser())
app.use(bodyParser.json())

const UploadImage = require("./src/utilis/UploadImage")

// routes
const userRoutes = require("./src/users/user.route");
const productsRoutes = require('./src/products/product.route')
const reviewsRoutes = require('./src/reviews/review.route')
const ordersRoutes = require("./src/orders/order.route");
const statsRoutes = require("./src/stats/stats.route")

app.use('/api/auth', userRoutes)
app.use("/api/products", productsRoutes)
app.use("/api/reviews", reviewsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/stats", statsRoutes);


async function main() {
    await mongoose.connect(process.env.UB_URL);
 
    app.get('/', (req, res) => {
      res.send('Lebaba E-commerce Server is running!')
    })
}


main().then(() => console.log("Mongodb connected successfuly!")).catch(err => console.log(err));


// upload image api
app.post('/uploadImage',  (req, res) => {
  UploadImage(req.body.image)
  .then((url) => res.send(url))
  .catch((error) => res.status(500).send(error));
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})