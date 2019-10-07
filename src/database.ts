import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then( db => console.log('db connect'))
  .catch(err => console.log(err))