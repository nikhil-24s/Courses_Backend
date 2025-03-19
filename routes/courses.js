const express = require('express')
const { addCourse, allCourses, getCourse, updateCourse, deleteCourse } = require('../controller/courses')
const router = express.Router()
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "./uploads/", // Ensure this folder exists
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
  });
  
  // File filter
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  };
  
  const upload = multer({ storage, fileFilter });


// router.post('/add-course',upload.single("image"),addCourse)
router.post('/add-course', (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ status: false, message: err.message });
    }
    next();
  });
}, addCourse);

router.get('/all-course',allCourses)
router.post('/get-course',getCourse)
router.post('/update-course',updateCourse)
router.post('/delte-course',deleteCourse)

module.exports = router