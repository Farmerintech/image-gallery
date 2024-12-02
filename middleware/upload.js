import multer from "multer";

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'client/uploads'); // Path where files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Add timestamp to avoid name conflicts
    }
});

const upload = multer({ storage });

export default upload;
