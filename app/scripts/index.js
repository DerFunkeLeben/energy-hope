import '../styles/main.scss'
// import './processData'
import './setFiasData'

if (process.env.NODE_ENV !== 'production') {
  require('../index.pug')
}
