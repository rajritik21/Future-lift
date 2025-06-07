const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');
const cloudinary = require('cloudinary').v2;

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');

    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving users: " + error.message
    });
  }
};

// Get user details by ID (admin only)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving user: " + error.message
    });
  }
};

// Update user role (admin only)
exports.updateUserRole = async (req, res) => {
  try {
    const { role, userType, adminRole, adminPermissions } = req.body;
    
    const updateData = {};
    if (role) updateData.role = role;
    if (userType) updateData.userType = userType;
    if (adminRole) updateData.adminRole = adminRole;
    if (adminPermissions) updateData.adminPermissions = adminPermissions;

    const user = await User.findByIdAndUpdate(
      req.params.id, 
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user: " + error.message
    });
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Delete user's avatar from cloudinary
    if (user.avatar && user.avatar.public_id) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }
    
    // Delete user's resume from cloudinary
    if (user.resume && user.resume.public_id) {
      await cloudinary.uploader.destroy(user.resume.public_id);
    }

    // Delete user's applications
    await Application.deleteMany({ applicant: user._id });
    
    // Remove user from jobs they've posted (if employer)
    if (user.userType === 'employer') {
      const jobs = await Job.find({ postedBy: user._id });
      
      // For each job, delete the job and related applications
      for (const job of jobs) {
        await Application.deleteMany({ job: job._id });
        
        // Delete company logo from cloudinary
        if (job.companyLogo && job.companyLogo.public_id) {
          await cloudinary.uploader.destroy(job.companyLogo.public_id);
        }
        
        await job.remove();
      }
    }

    await user.remove();

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting user: " + error.message
    });
  }
};

// Get all jobs (admin only)
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'name email');

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving jobs: " + error.message
    });
  }
};

// Get job by ID (admin only)
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name email');
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    res.status(200).json({
      success: true,
      job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving job: " + error.message
    });
  }
};

// Update job (admin only)
exports.updateJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    // Handle company logo update if provided
    if (req.body.companyLogo) {
      // Delete old logo
      if (job.companyLogo && job.companyLogo.public_id) {
        await cloudinary.uploader.destroy(job.companyLogo.public_id);
      }
      
      // Upload new logo
      const result = await cloudinary.uploader.upload(req.body.companyLogo, {
        folder: 'company_logos',
        width: 150,
        crop: "scale"
      });
      
      req.body.companyLogo = {
        public_id: result.public_id,
        url: result.secure_url
      };
    }

    job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating job: " + error.message
    });
  }
};

// Delete job (admin only)
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    // Delete company logo from cloudinary
    if (job.companyLogo && job.companyLogo.public_id) {
      await cloudinary.uploader.destroy(job.companyLogo.public_id);
    }
    
    // Delete all applications related to this job
    await Application.deleteMany({ job: job._id });
    
    await job.remove();

    res.status(200).json({
      success: true,
      message: "Job and related applications deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting job: " + error.message
    });
  }
};

// Get all applications (admin only)
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('job', 'title companyName')
      .populate('applicant', 'name email');

    res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving applications: " + error.message
    });
  }
};

// Get application by ID (admin only)
exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('job', 'title companyName location')
      .populate('applicant', 'name email avatar resume');
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    res.status(200).json({
      success: true,
      application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving application: " + error.message
    });
  }
};

// Update application status (admin only)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const updateData = {};
    if (status) updateData.status = status;
    if (notes) updateData.notes = notes;
    
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating application status: " + error.message
    });
  }
};

// Delete application (admin only)
exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }
    
    // Remove application ID from user's appliedJobs array
    await User.findByIdAndUpdate(
      application.applicant,
      { $pull: { appliedJobs: application._id } }
    );
    
    // Remove application ID from job's applications array
    await Job.findByIdAndUpdate(
      application.job,
      { $pull: { applications: application._id } }
    );
    
    // Delete any additional documents from cloudinary
    if (application.additionalDocuments && application.additionalDocuments.length > 0) {
      for (const doc of application.additionalDocuments) {
        if (doc.public_id) {
          await cloudinary.uploader.destroy(doc.public_id);
        }
      }
    }
    
    await application.remove();

    res.status(200).json({
      success: true,
      message: "Application deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting application: " + error.message
    });
  }
};

// Dashboard statistics (admin only)
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const jobSeekers = await User.countDocuments({ userType: 'jobseeker' });
    const employers = await User.countDocuments({ userType: 'employer' });
    const admins = await User.countDocuments({ userType: 'admin' });
    
    const totalJobs = await Job.countDocuments();
    const activeJobs = await Job.countDocuments({ active: true });
    const inactiveJobs = await Job.countDocuments({ active: false });
    
    const totalApplications = await Application.countDocuments();
    const pendingApplications = await Application.countDocuments({ status: 'pending' });
    const reviewingApplications = await Application.countDocuments({ status: 'under-review' });
    const shortlistedApplications = await Application.countDocuments({ status: 'shortlisted' });
    const rejectedApplications = await Application.countDocuments({ status: 'rejected' });
    const acceptedApplications = await Application.countDocuments({ status: 'accepted' });
    
    // Recent activity
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email userType createdAt');
      
    const recentJobs = await Job.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title companyName location jobType createdAt');
      
    const recentApplications = await Application.find()
      .sort({ appliedAt: -1 })
      .limit(5)
      .populate('job', 'title')
      .populate('applicant', 'name')
      .select('status appliedAt');

    res.status(200).json({
      success: true,
      stats: {
        users: {
          total: totalUsers,
          jobSeekers,
          employers,
          admins
        },
        jobs: {
          total: totalJobs,
          active: activeJobs,
          inactive: inactiveJobs
        },
        applications: {
          total: totalApplications,
          pending: pendingApplications,
          reviewing: reviewingApplications,
          shortlisted: shortlistedApplications,
          rejected: rejectedApplications,
          accepted: acceptedApplications
        },
        recent: {
          users: recentUsers,
          jobs: recentJobs,
          applications: recentApplications
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard statistics: " + error.message
    });
  }
};

// Remove all admin users (special function for resetting admin accounts)
exports.removeAllAdmins = async (req, res) => {
  try {
    // Find all admin users
    const adminUsers = await User.find({ 
      $or: [
        { userType: 'admin' },
        { role: 'admin' }
      ]
    }).select('name email');
    
    if (adminUsers.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No admin users found to remove"
      });
    }
    
    // Delete all admin users
    const result = await User.deleteMany({ 
      $or: [
        { userType: 'admin' },
        { role: 'admin' }
      ]
    });
    
    res.status(200).json({
      success: true,
      message: `Successfully removed ${result.deletedCount} admin user(s)`,
      removedAdmins: adminUsers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing admin users: " + error.message
    });
  }
}; 