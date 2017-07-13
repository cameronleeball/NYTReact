const React = require('react');


let Search = React.createClass({
  getInitialState: function() {
    return {
    	q: "",
    	begin_date: "19500101",
    	end_date: "20171231",
      toggle: false
    };
  }, 
  componentDidMount: function() {
    document.getElementById('submit-button').addEventListener('keypress', function(e) {
      if(e.which === 13) {
        this._handleSubmit(e);
      }
    });
  },
  _handleChangeQ: function(event) {
  	this.setState({
  		q: event.target.value,
  	});
  },
  _handleChangeB_D: function(event) {
  	this.setState({
  		begin_date: event.target.value
  	});
  },
	_handleChangeE_D: function(event) {
  	this.setState({
  		end_date: event.target.value
  	});
  },


  _handleSubmit: function(e) {   
    e.preventDefault(); 
  	this.props._nytGet(this.state.q, this.state.begin_date, this.state.end_date);
  	this.setState({
  		q: "",
  		begin_date: "19500101",
  		end_date: "20171231", 
  	});
    this.props._toggleResults();
  },

  render: function() {
    return (		

		<div className="container">
      <div className="row row-search-title">
        <div className="col col-sm-12 col-search-title">
              <h2><i className="fa fa-search"></i>Article Search</h2>
        </div>{/* end col-sm-12 */}
      </div>{/* end row */}
      <div className="row row-search-results">
        <form onSubmit={this._handleSubmit}>
          <div className="col col-sm-3 col-search-results">
            <label htmlFor="query">Seaach</label><br />
            <input 
          	 value={this.state.q}
          	 type="text" 
          	 id="query" 
          	 onChange={this._handleChangeQ}
            />
          </div>{/* /col-sm-3 */}
          <div className="col col-sm-3 col-search-results">
            <label htmlFor="begin-date">Earliest Date</label><br />
            <input 
          	 value={this.state.begin_date}
          	 type="text" 
          	 id="begin-date" 
          	 onChange={this._handleChangeB_D}
            />
          </div>{/* /col-sm-3 */}
          <div className="col col-sm-3 col-search-results">
            <label htmlFor="end-date">Latest Date</label><br />
            <input 
          	 value={this.state.end_date}
          	 type="text" 
          	 id="end-date" 
          	 onChange={this._handleChangeE_D}
            />
          </div>{/* /col-sm-3 */}
          <div className="col col-sm-3 col-search-results">
        	  <label></label><br />
            <button 
              type="submit" 
              className="btn btn-large btn-this" 
              id="submit-button"
            >
              Search Articles
            </button><br />
          </div>{/* end col-sm-3 */}
        </form>
      </div>{/* end row */}
      {/* end container */}
    </div>
    );
  }
});



{/* const viewArticles = this.state.articles.map((item, i) => {
      return <div>
        <h1>{item.name.first}</h1>
        <span>{item.cell}, {item.email}</span>
      </div>
    });

    return <div id="layout-content" className="layout-content-wrapper">
      <div className="panel-list">{viewArticles}</div>
    </div>
    */}

module.exports 	= Search;