import { getPages } from '../../../services/dato/pages.js';
import { createErrorResponse, createResponse } from '../../../utils/response.js';

const getPagesController = async (req, res) => {
  try {
    const pages = await getPages();

    return res.status(200).json(createResponse(pages, 200));
  } catch (error) {
    console.error('Error fetching pages: ', error);
    return res.status(500).json(createErrorResponse('Error fetching pages', 500));
  }
};

export { getPagesController };
