import { Router } from 'express';
import OpportunitiesController from '@modules/opportunities/infra/http/controllers/OpportunitiesController';

const opportunitiesRouter = Router();
const providersController = new OpportunitiesController();

opportunitiesRouter.get('/integrate', providersController.index);

export default opportunitiesRouter;
