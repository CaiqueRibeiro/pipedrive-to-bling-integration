import { Router } from 'express';
import OpportunitiesIntegrationController from '@modules/opportunities/infra/http/controllers/OpportunitiesIntegrationController';
import OpportunitiesController from '@modules/opportunities/infra/http/controllers/OpportunitiesController';

const opportunitiesRouter = Router();
const opportunitiesController = new OpportunitiesController();
const integrationController = new OpportunitiesIntegrationController();

opportunitiesRouter.get('/', opportunitiesController.index);
// Está como get para facilitar a chamada pelo navegador. Correto: POST
opportunitiesRouter.get('/integrate', integrationController.create);

export default opportunitiesRouter;
