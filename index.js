const express = require('express');
const Joi = require('joi');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
app.use(express.json());

const dataFilePath = path.join(__dirname, 'data.json');

// Функция для чтения данных из файла
const readData = () => {
    const rawData = fs.readFileSync(dataFilePath);
    return JSON.parse(rawData);
};

// Функция для записи данных в файл
const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

const schema = Joi.object({
    firstName: Joi.string().required(),
    secondName: Joi.string().required(),
    age: Joi.number().integer().min(0).max(150).required(),
    city: Joi.string().required()
});

app.get('/objects/:id', (req, res) => {
    const objects = readData();
    const object = objects.find(obj => obj.id == req.params.id);
    if (object) {
        res.json(object);
    } else {
        res.status(404).json({ message: 'Object not found' });
    }
});

app.post('/objects', (req, res) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const objects = readData();
    const newObject = {
        id: objects.length ? objects[objects.length - 1].id + 1 : 1,  // если массив пустой, id = 1
        ...req.body
    };
    objects.push(newObject);
    writeData(objects);
    res.status(201).json(newObject);
});

app.delete('/objects/:id', (req, res) => {
    let objects = readData();
    const index = objects.findIndex(obj => obj.id == req.params.id);
    if (index !== -1) {
        const deletedObject = objects.splice(index, 1);
        writeData(objects);
        res.json(deletedObject);
    } else {
        res.status(404).json({ message: 'Object not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
