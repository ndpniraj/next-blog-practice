import multer from "multer";

const storage = multer.diskStorage({});
export default multer({ storage });
