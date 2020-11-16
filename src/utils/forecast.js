const request = require('request')

const forecast = ({latitude, longitude}, callback) =>{
    //const url = "http://api.weatherstack.com/current?access_key=cc7309dc2ca40fe2191024d62f09ddf3&query=37.8287,-122.4233&units=f"
    const url = "http://api.weatherstack.com/current?access_key=cc7309dc2ca40fe2191024d62f09ddf3&query="+latitude+","+longitude+"&units=f"


    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('no connection',undefined)
        }else if(body.error){
            callback("404", undefined)
        }
        else{
            callback(undefined,body.current.weather_descriptions[0]+ " throughout the day. Temperature is currently " +body.current.temperature+" degrees" )
        }
    })
}

module.exports = forecast
