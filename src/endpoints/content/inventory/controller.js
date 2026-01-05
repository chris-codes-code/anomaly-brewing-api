import { getShopifyInventory } from '../../../services/shopify/getters/inventory.js';
import { createErrorResponse, createResponse } from '../../../utils/response.js';
import { HTTP_STATUS } from '../../../utils/constants.js';

const getInventoryController = async (req, res) => {
  try {
    const inventory = await getShopifyInventory();
    return res.status(HTTP_STATUS.OK).json(createResponse(inventory, HTTP_STATUS.OK));
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
      createErrorResponse('Error fetching inventory', HTTP_STATUS.INTERNAL_SERVER_ERROR),
    );
  }
};

export { getInventoryController };

