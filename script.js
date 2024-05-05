const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
        res.end(`<a href="/about">О сайте</a>`);
    } else if(req.url === '/about') {
        res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
        res.end(`<a href="/">Перейти на главную страницу</a>`);
    } else {
        res.writeHead(404, {'Content-type': 'text/html; charset=utf-8'});
        res.end(`<a href="/">Страница не найдена</a>`);
    }
});

const port = '3000';
server.listen(port);