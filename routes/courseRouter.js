const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  patchCourse,
  deleteCourse
} = require('../controllers/courseController');

// GET /api/courses - Get all courses
router.get('/', getAllCourses);

// GET /api/courses/:id - Get specific course
router.get('/:id', getCourseById);

// POST /api/courses - Create new course
router.post('/', createCourse);

// PUT /api/courses/:id - Update course (full update)
router.put('/:id', updateCourse);

// PATCH /api/courses/:id - Update course (partial update)
router.patch('/:id', patchCourse);

// DELETE /api/courses/:id - Delete course
router.delete('/:id', deleteCourse);

module.exports = router;
