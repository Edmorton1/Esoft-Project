// router.post(serverPaths.createForm, HttpFormController.postForm)

// router.get(serverPaths.refresh, HttpTokenController.refresh)

// router.get('/byParams', universalController('getByParams', 'users'))

// router.get("/test", AuthMiddleware.OnlyAuth, async (req, res) => {
//   // console.log(req.id)
//   res.json(req.userid)
// })

// router.get('/dec', (req, res) => {
//   const body = req.body;
//   logger.info(body)
//   res.header('lang', 'ru-RU')
//   res.sendStatus(500)
// })
// router.post(serverPaths.sendMessage, upload.array('files'), MessageMiddleware.sendMessage , HttpMessageController.sendMessage)
// router.put(`${serverPaths.editMessage}/:id`, upload.array('files'), MessageMiddleware.editMessage, HttpMessageController.editMessage)
// router.delete(`${serverPaths.deleteMessage}/:id`, SharedMiddlewares.OnlyIdMiddleware, HttpMessageController.deleteMessage)
// router.get(`${serverPaths.getMessage}/:frid/:toid`, MessageMiddleware.getMessage, HttpMessageController.getMessage)