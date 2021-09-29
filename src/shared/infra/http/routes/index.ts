import { Router } from 'express';
import opportunitiesRouter from '@modules/opportunities/infra/http/routes';

const routes = Router();

routes.use('/opportunities', opportunitiesRouter);

export default routes;
