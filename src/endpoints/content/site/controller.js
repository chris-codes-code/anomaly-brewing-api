import { createErrorResponse, createResponse } from '../../../utils/response.js';
import { getSite } from '../../../services/dato/site.js';
import { HTTP_STATUS } from '../../../utils/constants.js';

const getSiteController = async (req, res) => {
  try {
    const site = await getSite();
    return res.status(HTTP_STATUS.OK).json(createResponse(site, HTTP_STATUS.OK));
  } catch (error) {
    console.error('Error fetching site settings content:', error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
      createErrorResponse('Error fetching site settings content', HTTP_STATUS.INTERNAL_SERVER_ERROR),
    );
  }
};

export { getSiteController };
