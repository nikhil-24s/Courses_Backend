const courseModel = require('../models/courses')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const addCourse = async (req,res)=>{
   try {
    const {courseName, courseDesc, coursePrice} = req.body;
    // const imageUrl = req.file ? `https://courses-frontend-three.vercel.app/uploads/${req.file.filename}` : "";

    if (!req.file) {
        return res.status(400).json({ status: false, message: "Image is required." });
      }
  
    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "courses", // Optional folder in Cloudinary
      });
    const imageUrl = result.secure_url;
  
    const course = courseModel({
        courseName,
        courseDesc,
        coursePrice,
        image: imageUrl
    })
    await course.save();

    res.json({status: true, message: 'Course Added Successfully'});
   } catch (error) {
    console.log(error);
    
    res.json({status: false, message: 'Failed To Add Course', error});
   }
}
const allCourses = async (req,res)=>{
   try {
    const courses = await courseModel.find({});
    res.json({status: true, courses});
   } catch (error) {
    res.json({status: false, message: 'Failed To Get Course', error});
   }
}
const getCourse = async (req,res)=>{
    const {id} = req.body
   try {
    const course = await courseModel.findOne({_id: id});
    res.json({status: true, course});
   } catch (error) {
    res.json({status: false, message: 'Failed To Get Course', error});
   }
}
const updateCourse = async (req,res)=>{
    const {courseName, courseDesc, coursePrice , id} = req.body
   try {
    const course = await courseModel.findOneAndUpdate({_id: id},{courseName, courseDesc, coursePrice});
    res.json({status: true, message: 'Course Update Successfully'});
   } catch (error) {
    res.json({status: false, message: 'Failed To Update Course', error});
   }
}
const deleteCourse = async (req,res)=>{
    const {id} = req.body
   try {
    const course = await courseModel.findOneAndDelete({_id: id});
    res.json({status: true, message: 'Course Delete Successfully'});
   } catch (error) {
    res.json({status: false, message: 'Failed To Delete Course', error});
   }
}

module.exports = {
    addCourse,
    allCourses,
    getCourse,
    updateCourse,
    deleteCourse
}