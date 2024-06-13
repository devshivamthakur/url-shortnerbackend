 const { getUrlAnalytics, addUrlShortener, redirectToUrl } = require('../Controller/urlController')

const RouterObj = require('express').Router

const router = RouterObj()
router.get('/analytics/:shortId',getUrlAnalytics)
router.post("/",addUrlShortener)

const redirectRoute = RouterObj() 
redirectRoute.get("/:shortId",redirectToUrl)

module.exports = {
    router ,
    redirectRoute
}