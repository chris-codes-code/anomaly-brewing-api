import express from 'express';
import { getPageURL } from './endpoints/content/page/url.js';
import { getPagesURL } from './endpoints/content/pages/url.js';
import { getSiteURL } from './endpoints/content/site/url.js';
import { getSubscribeURL } from './endpoints/api/subscribe/url.js';
import { getSiteController } from './endpoints/content/site/controller.js';
import { getPageController } from './endpoints/content/page/controller.js';
import { getPagesController } from './endpoints/content/pages/controller.js';
import { postSubscribeController } from './endpoints/api/subscribe/controller.js';

const router = express.Router();

router.get(getSiteURL(), getSiteController);
router.get(getPageURL(), getPageController);
router.get(getPagesURL(), getPagesController);
router.post(getSubscribeURL(), postSubscribeController);

export default router;
