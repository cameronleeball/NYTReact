//promise-based http request package
const axios   = require('axios'),
      qs      = require('querystring');

// Geocoder API
// Helper functions for making API Calls
let helpers = {

  // This function serves our purpose of running the query to geolocate.
  _nytGet: function(q, begin_date, end_date) {

    let data = qs.stringify ({
        apikey: "77477d08cc0a4b84b344710a4dccb09d", 
        q: q, 
        sort: "newest", 
        hl: true, 
        fl: "web_url,snippet,headline,byline,pub_date", 
        begin_date:  begin_date, 
        end_date:    end_date,
        limit: 5
      });
      return axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?${data}`, {
        headers: {
          "Content-Type": "application/jsonp"
        }
      });
  },
  _mongoPost: function(postArticle) {
    let data = qs.stringify(postArticle);
    return axios.post(`/api/saved?${data}`);
  },
  _mongoGet: function() {
    return axios.get('/api/saved');
  }, 
  _mongoDelete: function(deleteArticle) {
    let data = qs.stringify(deleteArticle);
    console.log(data);
    return axios.delete(`/api/saved?${data}`);
  }
}
module.exports = helpers;
