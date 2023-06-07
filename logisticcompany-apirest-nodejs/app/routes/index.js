const express    = require('express');
const router     = express.Router();
const fs         = require('fs');
const pathRouter = `${__dirname}`;
const { filter } = require('../utils/handleRoutes');

/**
 * 
 */
const removeExtension = (fileName) => {
    return fileName.split('.').shift();
};

fs.readdirSync(pathRouter).filter((file) => {
    const fileWithOutExt = removeExtension(file);
    /**
     * Files exclude
     */
    const skip = filter.includes(fileWithOutExt);
    if (!skip) {
        /**
         * Load functions 'controllers'
         * Load root's dynamic
         */
        router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}`));
        console.log('LOAD ROOT ---->', file);        
    }
});

router.get('*', (req, res) => {
    res.status(404);
    res.send({ error: 'Not found' });
});

module.exports = router;