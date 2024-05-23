const express = require('express');
const fs = require('fs');
const exphbs = require('express-handlebars');
const app = express();
const PORT = 3000;

const viewCountFile = 'viewCounts.json';

const readViewCounts = () => {
    if (fs.existsSync(viewCountFile)) {
        const data = fs.readFileSync(viewCountFile, 'utf-8');
        return JSON.parse(data);
    }
    return {};
};

const writeViewCounts = (viewCounts) => {
    fs.writeFileSync(viewCountFile, JSON.stringify(viewCounts, null, 2));
};

const viewCounts = readViewCounts();

const updateViewCount = (page) => {
    viewCounts[page] = (viewCounts[page] || 0) + 1;
    writeViewCounts(viewCounts);
};

// Настройка системы шаблонов
const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'main'
});

app.engine('.hbs', hbs.engine, (err, html) => {
    if (err) {
        console.error('Error rendering template:', err);
        return;
    }
    return html;
});
app.set('view engine', '.hbs');
app.set('views', './views');

// Использование express.static для управления статическими файлами
app.use(express.static('public'));

// Маршруты для различных страниц
app.get('/', (req, res) => {
    updateViewCount('/');
    res.render('index', { title: 'Главная Страница', viewCount: viewCounts['/'] });
});

app.get('/about', (req, res) => {
    updateViewCount('/about');
    res.render('about', { title: 'О сайте', viewCount: viewCounts['/about'] });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
