require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const analyticsRoutes = require('./routes/analytics');

const app = express();
app.use(express.json());
app.use(cors()); 

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});

app.use('/api/analytics', analyticsRoutes);

app.get('/', (req, res) => res.send('CTG Analytics backend is running'));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
