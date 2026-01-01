import { createErrorResponse, createResponse } from '../../../utils/response.js';
import { getSite } from '../../../services/dato/site.js';


const getSiteController = async (req, res) => {
  try {
    const site = await getSite();

    return res.status(200).json(createResponse(site, 200));
  } catch (error) {
    console.error('Error fetching site settings content:', error);
    return res.status(500).json(createErrorResponse('Error fetching site settings content', 500));
  }
};

export { getSiteController };
