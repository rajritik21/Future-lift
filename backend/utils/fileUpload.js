const cloudinary = require('cloudinary').v2;

/**
 * Upload a file to Cloudinary
 * @param {string} fileString - Base64 encoded file
 * @param {string} folder - Folder name in Cloudinary
 * @param {Object} options - Additional upload options
 * @returns {Promise} - Cloudinary upload result
 */
exports.uploadFile = async (fileString, folder, options = {}) => {
  try {
    if (!fileString) {
      throw new Error('No file provided');
    }

    const uploadOptions = {
      folder,
      ...options
    };

    const result = await cloudinary.uploader.upload(fileString, uploadOptions);
    return result;
  } catch (error) {
    throw new Error(`Error uploading file: ${error.message}`);
  }
};

/**
 * Delete a file from Cloudinary
 * @param {string} publicId - Public ID of file to delete
 * @returns {Promise} - Cloudinary deletion result
 */
exports.deleteFile = async (publicId) => {
  try {
    if (!publicId) {
      throw new Error('No public ID provided');
    }

    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error(`Error deleting file: ${error.message}`);
  }
};

/**
 * Upload a resume to Cloudinary
 * @param {string} resumeString - Base64 encoded resume
 * @returns {Promise} - Cloudinary upload result
 */
exports.uploadResume = async (resumeString) => {
  return this.uploadFile(resumeString, 'resumes', {
    resource_type: 'auto',
    format: 'pdf',
    // Optimized for document storage
    pages: true
  });
};

/**
 * Upload a profile image to Cloudinary
 * @param {string} imageString - Base64 encoded image
 * @returns {Promise} - Cloudinary upload result
 */
exports.uploadProfileImage = async (imageString) => {
  return this.uploadFile(imageString, 'profile_images', {
    width: 500,
    height: 500,
    crop: 'fill',
    gravity: 'face',
    quality: 'auto:good'
  });
};

/**
 * Upload a company logo to Cloudinary
 * @param {string} logoString - Base64 encoded logo
 * @returns {Promise} - Cloudinary upload result
 */
exports.uploadCompanyLogo = async (logoString) => {
  return this.uploadFile(logoString, 'company_logos', {
    width: 300,
    crop: 'scale',
    quality: 'auto:good'
  });
}; 