const React = require('react');
const Masonry = require('react-masonry-component');

let History = React.createClass({

	componentWillMount: function() {
		this.props._mongoGet();
	},
	_showMongo: function() {
		let mapArts = this.props.articlesMongo.map((itemObj, index) => {
			return( 
       <div className="col col-sm-3 col-result-body" key={index} data-id={itemObj._id}>
        	<h4><a href={itemObj.web_url} target="_blank">{itemObj.headline}</a></h4>
          <p>{itemObj.pub_date}</p>
          <p>{itemObj.byline}</p>
          <p>... {itemObj.snippet}...</p>
          <button 
          	type="button" 
          	className="btn btn-large btn-this" 
          	onClick={() => {
          		this.props._mongoDelete({_id: itemObj._id})
          	}}>Delete Article</button><br />
        </div>
      );
    });
    return mapArts;
 	},

	render: function() {
		return (
			<div className="container">
				<div className="row row-result-title">
					<div className="col col-sm-12 col-result-title">
						<h2 className="text-right"><i className="fa fa-bullseye"></i>   you have saved {this.props.articlesMongo.length} articles</h2>
					</div>{/* end col-sm-12 */}
				</div>{/* end row */}

				<Masonry
					className={'row'} // default '' 
					elementType={'div'} // default 'div'  
					disableImagesLoaded={false} // default false 
					updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false 
				>
					{this._showMongo()}
				</Masonry>{/* end row */}
			{/* end container */}
			</div>
		);
	}
});

module.exports = History;