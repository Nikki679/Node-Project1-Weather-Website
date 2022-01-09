const request=require('request')

const forecast = (latitude,longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=8f381ee7ad5dccafec14e981813f9b89&query=' + latitude + ',' + longitude + '&units=f';
  request({url, json:true},(error,{body})=>
  {
      if(error)
      {
          callback('Unable to connect to weather service',undefined)
      }
      else if(body.error)
      {
          callback('Unable to find location, try out another',undefined)
      }
      else{
          callback(undefined,body.current.weather_descriptions[0] +' throughout the day. It currently '+body.current.temperature+' degrees out. It has humidity around '+body.current.humidity+' degress out')
      }
  })
  };

  module.exports=forecast