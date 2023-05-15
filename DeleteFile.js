const fs = require('fs');

const deleteFile=(fileName)=>{
    fs.unlink("public/uploads/" + fileName, (err) => {
        if (err) {
            console.log("File couldnot be dealitead")
        }else
            console.log(fileName," Delete File successfully.");
    });
}


module.exports= {deleteFile}