import { getPage } from '../../../services/dato/page.js';
import { createErrorResponse, createResponse } from '../../../utils/response.js';
import { validateSlug } from '../../../utils/validation.js';
import { HTTP_STATUS } from '../../../utils/constants.js';
import config from './config.js';
import { addShopifyData } from './_utils/shopify-page.js';

const getPageController = async (req, res) => {
  try {
    const { params } = req;
    const { [config.params.page]: slug } = params;

    if (!slug) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(
        createErrorResponse('Page slug is required', HTTP_STATUS.BAD_REQUEST),
      );
    }

    validateSlug(slug);

    const page = await getPage(slug);
    const builtPage = await addShopifyData(page);

    return res.status(HTTP_STATUS.OK).json(createResponse(builtPage, HTTP_STATUS.OK));
  } catch (error) {
    console.error('Error fetching page: ', error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
      createErrorResponse('Error fetching page', HTTP_STATUS.INTERNAL_SERVER_ERROR),
    );
  }
};

export { getPageController };
