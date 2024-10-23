import multer from 'multer';
import path  from 'path';

// Initialize a storage engine for multer
const storage = multer.diskStorage({
     destination : (req,file,callBack) =>{
     callBack(null,path.join(__dirname,'../public/images'));
    },
    
    filename :(req,file,callBack) => {
        const uniqueName = Date.now()+ ' '+file.originalname;
        callBack(null,uniqueName);
    }
});

export default multer({storage :storage });