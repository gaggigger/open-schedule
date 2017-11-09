'use strict';



class UtilsHandlers {

    handleError(res, status, err) {
        console.error(err);
        res.status(status).json({ error : err.message });
    }
}

module.exports = new UtilsHandlers();