const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.listen(3000);

// app.get('/', (req, res) => {
//     res.send('<p>Home</p>');
// });
// app.get('/Add-item', (req, res) => {
//     res.send('<p>Add-item</p>');
// });
/* 
app.get('/', (req, res) => {
    res.sendFile('/views/index.ejs', {root:__dirname});
});
app.get('/add-item', (req, res) => {
    res.sendFile('/views/addItem.ejs', {root:__dirname});
});
app.use((req, res) => {
    res.sendFile('/views/error.ejs', {root:__dirname});
}); 
*/
const item = [
    {name: "Marcello", lName: "Luna"},
    {name: "Evan", lName: "Sambrugaro"},
    {name: "Calvin", lName: "Newlander"},
    {name: "Caytlin", lName: "Lindeland"},
]

app.get('/', (req, res) => {
    res.render('index', {item});
});  

app.get('/add-item', (req, res) => {
    res.render('addItem');
});  
app.use((req, res) => {
    res.render('error');
});  