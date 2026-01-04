import { getPages } from '../../../services/dato/pages.js';
import { createErrorResponse, createResponse } from '../../../utils/response.js';
import { HTTP_STATUS } from '../../../utils/constants.js';

const getPagesController = async (req, res) => {
  try {
    const pages = await getPages();
    return res.status(HTTP_STATUS.OK).json(createResponse(pages, HTTP_STATUS.OK));
  } catch (error) {
    console.error('Error fetching pages: ', error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
      createErrorResponse('Error fetching pages', HTTP_STATUS.INTERNAL_SERVER_ERROR),
    );
  }
};

export { getPagesController };
