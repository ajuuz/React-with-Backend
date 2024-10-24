const multer = require('multer');
const path = require('node:path')
const fs = require('node:fs');

// Define the uploads directory path
const uploadsDir = path.join(__dirname,'../uploads');

// Check if the uploads directory exists, and create it if it doesn't
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true }); // recursive ensures parent directories are created
}

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'../uploads'))
    },
    filename: (req, file, cb)=>{
        const name = Date.now() + "-" + file.originalname;
        cb(null, name);
    },
})

const upload = multer({storage:storage})

module.exports = {upload}