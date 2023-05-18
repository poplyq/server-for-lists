const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const cardsController = require('../controllers/cards-controller');
const authMiddleware = require('../middlewares/auth-middleware');

const router = new Router();
const { body } = require('express-validator');
const tasksController = require('../controllers/tasks.controller');

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);
router.get('/cards', authMiddleware, cardsController.getCards);
router.post('/add/card', authMiddleware, cardsController.addCard);
router.post('/delete/card', authMiddleware, cardsController.deleteCard);
router.post('/update/card/order', authMiddleware, cardsController.updateCard);
router.post(
  '/update/card/name',
  authMiddleware,
  cardsController.updateCardName
);
router.post('/delete/task', authMiddleware, tasksController.deleteTask);
router.post(
  '/update/task/order',
  authMiddleware,
  tasksController.upadateTaskOrder
);
router.post(
  '/update/task/name',
  authMiddleware,
  tasksController.upadateTaskName
);
router.post(
  '/update/task/cardname',
  authMiddleware,
  tasksController.upadateCardNameOfTask
);

module.exports = router;
