const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const db = require('./db.json')
const middlewares = jsonServer.defaults()
const bodyParser = require('body-parser')

server.use(bodyParser.json())

server.use(middlewares)

server.post('/me', (req, res) => {
  const user = db.users.find(user => {
    return user.email === req.body.email
  });

  return {
    ...user,
    password: null,
  }
});

server.post('/login', (req, res) => {

  const user = db.users.find(user => {
    if (user.email == req.body.email && user.password == req.body.password) {
      return true;
    }
    return false;
  })

  if (user) {
    return res.jsonp({
      success: true,
      message: `Welcome ${req.body.email}`,
      data: {
        id: user.id,
        email: user.email,
        role_id: user.role_id,
      },
    })
  }

  return res.status(401).jsonp({
    success: false,
    message: 'Invalid credentials',
  })
})

server.use((req, res, next) => {

  if (req.headers['authorization'] == 'Bearer 123') {
    return next()
  }

  res.sendStatus(401).jsonp({
    'message': 'Unauthorized',
  })
})

server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running')
})
