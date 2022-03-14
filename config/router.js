'use strict';

const items = require(__dirname + '/../controllers/items');

module.exports = (router) => {
    router.del = router.delete;

	router.get ('/api/items', items.get_all_items);
	router.get ('/api/items/search/:id', items.search_item);

    router.all ('*', (req, res) => {
		res.status(404).send({
            message: 'Not Found!'
        });
	});

	return router;
};