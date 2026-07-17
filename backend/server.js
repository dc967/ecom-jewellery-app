const express = require('express');
const app = express()
const connectDB = require('./src/config/db')
const authRoutes = require('./src/routes/auth_routes');
const itemRoutes = require('./src/routes/items_routes')
const orderRoutes = require('./src/routes/order_routes');
require('dotenv').config();
const port = 3000

app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/items', itemRoutes)
app.use('/api/orders', orderRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

connectDB().then(() => {
 app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
})
