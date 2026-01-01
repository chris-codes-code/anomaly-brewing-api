import { getPage } from '../../../services/dato/page.js';
import { createErrorResponse, createResponse } from '../../../utils/response.js';
import config from './config.js';

const getPageController = async (req, res) => {
  try {
    const { params } = req;
    const { [config.params.page]: slug } = params;
    const page = await getPage(slug);

    return res.status(200).json(createResponse(page, 200));
  } catch (error) {
    console.error('Error fetching page: ', error);
    return res.status(500).json(createErrorResponse('Error fetching page', 500));
  }
};

export { getPageController };
