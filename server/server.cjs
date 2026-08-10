const path = require('node:path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((_request, response, next) => {
    response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.setHeader('Pragma', 'no-cache');
    response.setHeader('Expires', '0');
    next();
});

server.use((_request, _response, next) => {
    setTimeout(next, 350);
});

server.post('/auth/login', (request, response) => {
    const { login, password } = request.body;
    if (login === 'user' && password === 'password') {
        response.status(200).json({
            token: 'fake-auth-token',
        });

        return;
    }

    response.status(401).json({
        message: 'Неверный логин или пароль',
    });
});

server.use(router);

server.listen(3001, () => {
    console.log('Fake API started: http://localhost:3001');
});
