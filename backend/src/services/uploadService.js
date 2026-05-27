import streamifier from 'streamifier';
import cloudinary from '../config/cloudinary.js';
import { ApiError } from '../utils/ApiError.js';

export const uploadImage = (fileBuffer, folder) => {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_SECRET) {
    throw new ApiError(500, 'Cloudinary environment variables are not configured');
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder, resource_type: 'image' }, (error, result) => {
      if (error) return reject(error);
      resolve(result.secure_url);
    });

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

