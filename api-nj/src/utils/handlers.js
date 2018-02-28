'use strict';



class UtilsHandlers {

    handleError(res, status, err) {
        console.error(err);
        res.status(status).send({ error : (err.message)? err.message : err });
    }
}

module.exports = new UtilsHandlers();