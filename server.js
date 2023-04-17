const app = require('./src/app');
const mongoose = require('./src/config/database');

if (!Object.keys(mongoose).length) return;

app.listen(3000, function(){
console.log("server is running");
})
