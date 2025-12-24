const mongoose = require('mongoose');
const Course = require('../models/Course');

// In-memory storage (fallback when MongoDB is not available)
let courses = [
  {
    id: '1',
    title: 'Introduction to JavaScript',
    instructor: 'John Doe',
    duration: 40,
    price: 49.99,
    description: 'Learn the fundamentals of JavaScript programming'
  },
  {
    id: '2',
    title: 'Advanced React Development',
    instructor: 'Jane Smith',
    duration: 60,
    price: 79.99,
    description: 'Master React with hooks, context, and advanced patterns'
  }
];

let nextId = 3;

// Helper function to check if MongoDB is connected
const isMongoConnected = () => {
  return mongoose.connection.readyState === 1;
};

// GET /api/courses - Get all courses
const getAllCourses = async (req, res) => {
  try {
    if (isMongoConnected()) {
      // Use MongoDB
      const courses = await Course.find();
      res.json({
        success: true,
        count: courses.length,
        data: courses,
        storage: 'MongoDB'
      });
    } else {
      // Use in-memory storage
      res.json({
        success: true,
        count: courses.length,
        data: courses,
        storage: 'in-memory'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// GET /api/courses/:id - Get specific course
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected()) {
      // Use MongoDB
      const course = await Course.findById(id);
      if (!course) {
        return res.status(404).json({
          success: false,
          error: `Course with id ${id} not found`,
          storage: 'MongoDB'
        });
      }
      res.json({
        success: true,
        data: course,
        storage: 'MongoDB'
      });
    } else {
      // Use in-memory storage
      const course = courses.find(c => c.id === id);
      if (!course) {
        return res.status(404).json({
          success: false,
          error: `Course with id ${id} not found`,
          storage: 'in-memory'
        });
      }
      res.json({
        success: true,
        data: course,
        storage: 'in-memory'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// POST /api/courses - Create new course
const createCourse = async (req, res) => {
  try {
    const { title, instructor, duration, price, description } = req.body;

    // Validation
    if (!title || !instructor) {
      return res.status(400).json({
        success: false,
        error: 'Title and instructor are required fields'
      });
    }

    if (isMongoConnected()) {
      // Use MongoDB
      const course = new Course({
        title,
        instructor,
        duration: duration || 0,
        price: price || 0,
        description: description || ''
      });
      const savedCourse = await course.save();
      res.status(201).json({
        success: true,
        data: savedCourse,
        storage: 'MongoDB'
      });
    } else {
      // Use in-memory storage
      const newCourse = {
        id: String(nextId++),
        title,
        instructor,
        duration: duration || 0,
        price: price || 0,
        description: description || ''
      };
      courses.push(newCourse);
      res.status(201).json({
        success: true,
        data: newCourse,
        storage: 'in-memory'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// PUT /api/courses/:id - Update course (full update)
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, instructor, duration, price, description } = req.body;

    if (isMongoConnected()) {
      // Use MongoDB
      const course = await Course.findByIdAndUpdate(
        id,
        {
          title,
          instructor,
          duration,
          price,
          description
        },
        { new: true, runValidators: true }
      );
      if (!course) {
        return res.status(404).json({
          success: false,
          error: `Course with id ${id} not found`,
          storage: 'MongoDB'
        });
      }
      res.json({
        success: true,
        data: course,
        storage: 'MongoDB'
      });
    } else {
      // Use in-memory storage
      const courseIndex = courses.findIndex(c => c.id === id);
      if (courseIndex === -1) {
        return res.status(404).json({
          success: false,
          error: `Course with id ${id} not found`,
          storage: 'in-memory'
        });
      }
      courses[courseIndex] = {
        id,
        title,
        instructor,
        duration: duration || 0,
        price: price || 0,
        description: description || ''
      };
      res.json({
        success: true,
        data: courses[courseIndex],
        storage: 'in-memory'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// PATCH /api/courses/:id - Update course (partial update)
const patchCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (isMongoConnected()) {
      // Use MongoDB
      const course = await Course.findByIdAndUpdate(
        id,
        updates,
        { new: true, runValidators: true }
      );
      if (!course) {
        return res.status(404).json({
          success: false,
          error: `Course with id ${id} not found`,
          storage: 'MongoDB'
        });
      }
      res.json({
        success: true,
        data: course,
        storage: 'MongoDB'
      });
    } else {
      // Use in-memory storage
      const courseIndex = courses.findIndex(c => c.id === id);
      if (courseIndex === -1) {
        return res.status(404).json({
          success: false,
          error: `Course with id ${id} not found`,
          storage: 'in-memory'
        });
      }
      courses[courseIndex] = {
        ...courses[courseIndex],
        ...updates
      };
      res.json({
        success: true,
        data: courses[courseIndex],
        storage: 'in-memory'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// DELETE /api/courses/:id - Delete course
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected()) {
      // Use MongoDB
      const course = await Course.findByIdAndDelete(id);
      if (!course) {
        return res.status(404).json({
          success: false,
          error: `Course with id ${id} not found`,
          storage: 'MongoDB'
        });
      }
      res.json({
        success: true,
        data: course,
        message: 'Course deleted successfully',
        storage: 'MongoDB'
      });
    } else {
      // Use in-memory storage
      const courseIndex = courses.findIndex(c => c.id === id);
      if (courseIndex === -1) {
        return res.status(404).json({
          success: false,
          error: `Course with id ${id} not found`,
          storage: 'in-memory'
        });
      }
      const deletedCourse = courses.splice(courseIndex, 1)[0];
      res.json({
        success: true,
        data: deletedCourse,
        message: 'Course deleted successfully',
        storage: 'in-memory'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  patchCourse,
  deleteCourse
};

