const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  const { setAsync, getAsync } = redis;
  let todoCount = await getAsync('todoCount');
  if (!todoCount) {
    todoCount = 0;
  }
  todoCount++;
  await setAsync('todoCount', todoCount);

  res.send(todo);
});

router.get("/statistics", async (req, res) => {
  const { getAsync } = redis
  const todoCount = await getAsync('todoCount')
  res.send({ "added_todos": todoCount })
})


const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)
  next()
}

router.use('/:id', findByIdMiddleware, singleRouter)


/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  console.log(req.todo)
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body
  if (text) req.todo.text = text
  if (done) req.todo.done = done
  await req.todo.save()
  res.send(req.todo);
});


module.exports = router;