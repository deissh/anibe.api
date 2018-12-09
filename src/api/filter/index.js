import { Router } from 'express'
import { middleware as query } from 'querymen'
import { index } from './controller'

const router = new Router()

/**
 * @api {get} /filters Retrieve filters
 * @apiName RetrieveFilters
 * @apiGroup Filter
 * @apiUse listParams
 * @apiSuccess {Object[]} filters List of filters.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

export default router
