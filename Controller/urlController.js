const ApiError = require("../MiddleWare/Apierrors")
const validation = require("../MiddleWare/handleValidation")
const urlInfoModal = require("../Modals/urlInfo.modal")
const nanoid = require("nanoid").nanoid
const getUrlAnalytics = async (req, res, next) => {
    try {
        validation(req.params.shortId, 'shortId')
        const result = await getUrlAnalyticInfo(req.params.shortId)

       res.json({
        message:'analytics fetched successfully.',
        data: result
       })


    } catch (error) {
        next(error)
    }

}

const getUrlAnalyticInfo = async (shortId) => {

    try {
        const result = await urlInfoModal.findOne({ shortId: shortId })
        if (result) {
            return {
                totalVisits: result.urlHistory.length,
                analytics: result.urlHistory
            }

        }

        return { totalVisits: 0, analytics: {} }
    } catch (error) {
        throw new ApiError(500, "server error")
    }

}

const addUrlShortener = async (req, res, next) => {
    try {
        const validateRequest = validation(req.body.uri, "weburl")

        const result = await saveUrlShortener(req.body.uri)
        res.json({
            message: "url shortener created successfully.",
            shortId: result
        })
    } catch (error) {
        // console.error(error)
        next(error)
    }
}

const saveUrlShortener = async (uri) => {
    try {
        const hashUniqueId = nanoid(10)
        const findShortId = await urlInfoModal.findOne({ redirectURL: uri })
        if (findShortId) return findShortId.shortId
        const result = await urlInfoModal.create({
            shortId: hashUniqueId,
            redirectURL: uri,
            visitHistory: [],
        })
        return hashUniqueId
    } catch (error) {
        throw new ApiError(500, 'server error')

    }
}

const redirectToUrl = async (req, res, next) => {
    try {
        validation(req.params.shortId, 'shortId')

        const result = await urlInfoModal.findOneAndUpdate({ shortId: req.params.shortId }, {
            $push: {
                urlHistory: {
                    createdAt: Date.now(),
                }
            }
        },
        {
            new: true, // Return the updated document
            projection: { urlHistory: 0, createdAt: 0 } // Exclude these fields
        }
        )
        if(!result){
            res.status(400).json({
                message: "invalid shortId " + req.params.shortId
            })

        }
        res.json({
            message: 'long url get success',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            message: "invalid shortId " + req.params.shortId
        })
    }
}

module.exports = {
    getUrlAnalytics,
    addUrlShortener,
    redirectToUrl
}