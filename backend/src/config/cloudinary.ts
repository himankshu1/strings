import { v2 as cloudinary } from 'cloudinary';
import { Config } from './index';
import fs from 'fs';
import logger from './logger';
import { ExtendedUploadApiResponse } from '../controllers/admin.controller';

// Configure Cloudinary
cloudinary.config({
    cloud_name: Config.CLOUDINARY_CLOUD_NAME,
    api_key: Config.CLOUDINARY_API_KEY,
    api_secret: Config.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (
    localFilePaths: string[]
): Promise<ExtendedUploadApiResponse[]> => {
    try {
        // Validate input
        if (!localFilePaths || localFilePaths.length === 0) {
            console.error('No file paths provided for upload.');
            // return null;
        }

        // console.log('Local file paths:', localFilePaths);

        //* Create upload promises
        const uploadPromises = localFilePaths.map((path) =>
            cloudinary.uploader.upload(path, {
                resource_type: 'auto',
            })
        );

        //* Await all upload promises
        const uploadResults = await Promise.all(uploadPromises);
        // console.log('uploadResults', uploadResults);

        //* return the upload results
        return uploadResults;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        if (error instanceof Error) {
            logger.error("Couldn't upload the image to cloudinary", {
                error: error.message,
            });
        } else {
            logger.error(
                'sonething went wrong while uploading images to cloudinary',
                { error: JSON.stringify(error) }
            );
        }

        //* deleting files from the local storage path
        localFilePaths.map((path) => fs.unlinkSync(path));
        throw error;
    }
};
