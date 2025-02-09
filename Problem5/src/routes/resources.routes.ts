import { Router } from 'express';
import {
  deleteItem,
  getItemDetails,
  getItems,
  postCreateItem,
  putUpdateItem,
} from '../controllers/resources.controllers';

const router = Router();

router.get('/', getItems);

router.post('/', postCreateItem);

router.get('/:id', getItemDetails);

router.put('/:id', putUpdateItem);

router.delete('/:id', deleteItem);

export default router;
