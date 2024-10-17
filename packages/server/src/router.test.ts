import { Router } from './router';

const router = new Router();

router.get('/test/:id/field/:name', ({ ctx }) => {
  ctx.params;
});
