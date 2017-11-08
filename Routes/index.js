import router from './config.api';

/**
 * @api {get} / API Status
 * @apiSuccess {String} status API Status message
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {"status": "Tasks API"}
 */

router.route('/')
.get ((req, res) => {
    return res.json({Status: "Tasks API"})
})

const Index = router;

export default Index;