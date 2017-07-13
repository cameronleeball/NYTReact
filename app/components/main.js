const React   = require('react'),  
      helpers = require('./utils/helpers'), 
      Search  = require('./children/search'), 
      Results = require('./children/results'),
      History = require('./children/history'), 
      util    = require('util');


let Main = React.createClass({
  getInitialState: function() {
    return {
      articlesNyt: [],
      articlesMongo:[],
      toggle: false
    };
  }, 
  _toggleResults: function() {
    this.setState({
      toggle: true
    });
  }, 
  _nytGet: function(q, begin_date, end_date) {
    this.setState({
      articlesNyt: []
    });
    helpers._nytGet(q, begin_date, end_date)
    .then(function cbres(result) {
      let nytRes = result.data.response.docs;
      console.log(nytRes);
      nytRes.map((itemObj, index) => {
        this.setState({articlesNyt: 
          this.state.articlesNyt.concat({
            web_url  : itemObj.web_url,
            snippet  : itemObj.snippet.replace(/(<([^>]+)>)/ig, ""),
            headline : itemObj.headline.main,
            byline   : itemObj.byline.original,
            pub_date : itemObj.pub_date
          }) //concat
        }); //setState
      }); //map
    }.bind(this)) //then cbres
    .then(function cblog() {
      console.log(this.state.articlesNyt)
    }.bind(this)); //then cblog
  }, // _nytGet

  _mongoPost: function(postArticle) {
    helpers._mongoPost(postArticle)
    .then(this._mongoGet());
  },

  _mongoGet: function() {
    this.setState({
      articlesMongo: []
    });
    helpers._mongoGet()
    .then(function cbres(result) {
      console.log('cbres result ' + util.inspect(result));
      result.data.map((itemObj, index) => {
        this.setState({articlesMongo: 
          this.state.articlesMongo.concat({
            _id        : itemObj._id,  
            web_url    : itemObj.web_url,
            snippet    : itemObj.snippet,
            headline   : itemObj.headline,
            byline     : itemObj.byline,
            pub_date   : itemObj.pub_date, 
            date_saved : itemObj.date_saved 
          }) //concat
        }); //setState
      }); //map
    }.bind(this)) //then cbres
    .then(function cblog() {
      console.log(this.state.articlesMongo);
    }.bind(this)); //then cblog
  },

  _mongoDelete: function(deleteArticle) {
    helpers._mongoDelete(deleteArticle)
    .then(this._mongoGet());
  },

  render: function() {
    return (
      <div>
        <div className="container container-title text-right">
          <div className="row">
            <div className="col col-sm-12">
              <h2><i className="fa fa-scissors"></i>   nyt clipper</h2>
            </div>{/* end col-sm-12 */}
          </div>{/* end row */}
        </div>{/* end inner container */}

        <Search  
          _nytGet={this._nytGet} 
          _toggleResults={this._toggleResults}
        />
        <Results 
          articlesNyt={this.state.articlesNyt}
          _mongoPost={this._mongoPost}
          toggle={this.state.toggle}
        />
        <History 
          articlesMongo={this.state.articlesMongo}
          _mongoDelete={this._mongoDelete}
          _mongoGet={this._mongoGet}
        />
      {/* end overall container */}      
      </div>
    );
  }
});

module.exports  = Main;