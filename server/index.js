const jsonServer = require('json-server')
const auth = require('json-server-auth')
const cors = require('cors')
const app = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults({
    static: '../client/build',
})

const PORT = process.env.PORT || 5000

// /!\ Bind the router db to the app
app.db = router.db
const rules = auth.rewriter({
    // Permission rules
    users: 640,
    deals: 660,
    customers: 660,
    operations: 660
})

//Allow-access-control and cors policy
app.use(
    cors({
        origin: true,
        credentials: true,
        preflightContinue: false,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    })
)
app.options('*', cors())
app.use(middlewares)
app.use(rules)
app.use(auth)
app.use(router)
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))