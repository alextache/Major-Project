// request require npm package
const request = require('request-promise')

// search for photos based on param
const search = (param, orientation, pageNumbers, itemsPerPage, callback) => {
    const url= `https://api.unsplash.com/search/photos/?page=${pageNumbers}&per_page=${itemsPerPage}&query=${param}&client_id=ubbKAnh9znsgDy1nE2q0RAGzh6v3FQcDm7W54E3Cuqw&orientation=${orientation}`

    request({url:url, json:true}, (error, response) => {
        if (error) {
            callback('Unable to connect to API', undefined)
        } else if (response.body.errors){
            callback('Unable to connect to API', undefined)
        } else if(response.body.total < 1){
            callback('No pictures found', undefined)
        } else {
            callback(undefined, {
                response: response
            })
        }

    })

}

// export the code as a module
module.exports = search


// https://api.unsplash.com/search/photos/?page=1&per_page=4&query=car&client_id=ubbKAnh9znsgDy1nE2q0RAGzh6v3FQcDm7W54E3Cuqw&orientation=landscape
// url can be used to get a sample of a response
