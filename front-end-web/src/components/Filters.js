import React from 'react'
import './ExtraStyles.css'

const Filters = ({ products, isCategorySet }) => {

	const filterFields = ["author", "publisher"]

	const getCounts = (field) => {
		let counts = []
		let copyOfProducts = [...products]
		
		while(copyOfProducts.length > 0)
		{
			let val = copyOfProducts[0][field]
			const countVal = copyOfProducts.reduce((counter, obj) => obj[field] === val ? counter += 1 : counter, 0)

			copyOfProducts = copyOfProducts.filter((elem) => elem[field] !== val)
			counts.push({[field]: val, "count": countVal})
		}
		return counts
	}

  return (
    <div className="container">
	<div className="row">
		
<div className="card text-dark" style={{width: "32rem"}}>
	
	{isCategorySet === false ? <article className="filter-group">
		<header className="card-header bg-light">
			<a href="#" data-toggle="collapse" data-target="#collapse_0" aria-expanded="false" className="text-dark">
				<i className="icon-control fa fa-chevron-down"></i>
				<h6 className="title">Category </h6>
			</a>
		</header>
		<div className="filter-content collapse in" id="collapse_0">
			<div className="card-body">
				<ul className="list-menu">
				<li><a href="#" className='text-dark'>Classics  </a></li>
				<li><a href="#" className='text-dark'>History </a></li>
				<li><a href="#" className='text-dark'>Fiction  </a></li>
				<li><a href="#" className='text-dark'>Science  </a></li>
				<li><a href="#" className='text-dark'>Foreign Language </a></li>
				<li><a href="#" className='text-dark'>Philosophy</a></li>
				<li><a href="#" className='text-dark'>Self-Development </a></li>
				<li><a href="#" className='text-dark'>Children </a></li>
				<li><a href="#" className='text-dark'>Religious </a></li>
				<li><a href="#" className='text-dark'>Textbook </a></li>
				</ul>

			</div>
		</div>
	</article> : <></>}
	<article className="filter-group">
		<header className="card-header bg-light rounded-0">
			<a href="#" data-toggle="collapse" data-target="#collapse_1" aria-expanded="true" className="text-dark">
				<i className="icon-control fa fa-chevron-down"></i>
				<h6 className="title">Author</h6>
			</a>
		</header>
		<div className="filter-content collapse show" id="collapse_1" >
			<div className="card-body">
				<form className="pb-3">
					<div className="input-group">
					<input type="text" className="form-control" placeholder="Search.."/>
					<div className="input-group-append">
						<button className="btn btn-light" type="button"><i className="fa fa-search"></i></button>
					</div>
					</div>
				</form>
				{
					getCounts("author").sort((a, b) => (a.count > b.count) ? -1 : 1).map((item) => (
						<label className="custom-control custom-checkbox">
						<input type="checkbox" className="custom-control-input"/>
						<div className="custom-control-label">{item.author}  
							<b className="badge badge-pill badge-light float-right">{item.count}</b>  </div>
					  </label>
					  ))
				}
				<br></br>
				<button className="btn btn-block btn-primary">Apply</button>
			</div>
				
		</div>
	</article>
	<article className="filter-group">
		<header className="card-header bg-light rounded-0">
			<a href="#" data-toggle="collapse" data-target="#collapse_2" aria-expanded="true" className="text-dark">
				<i className="icon-control fa fa-chevron-down"></i>
				<h6 className="title">Publisher</h6>
			</a>
		</header>
		<div className="filter-content collapse show" id="collapse_2" >
			<div className="card-body">
				<form className="pb-3">
					<div className="input-group">
					<input type="text" className="form-control" placeholder="Search.."/>
					<div className="input-group-append">
						<button className="btn btn-light" type="button"><i className="fa fa-search"></i></button>
					</div>
					</div>
				</form>
				{
					getCounts("publisher").sort((a, b) => (a.count > b.count) ? -1 : 1).map((item) => (
						<label className="custom-control custom-checkbox">
						<input type="checkbox" className="custom-control-input"/>
						<div className="custom-control-label">{item.publisher}  
							<b className="badge badge-pill badge-light float-right">{item.count}</b>  </div>
					  </label>
					  ))
				}
				<br></br>
				<button className="btn btn-block btn-primary">Apply</button>
			</div>
				
		</div>
	</article>
	<article className="filter-group">
		<header className="card-header bg-light rounded-0">
			<a href="#" data-toggle="collapse" data-target="#collapse_7" aria-expanded="true" className="text-dark">
				<i className="icon-control fa fa-chevron-down"></i>
				<h6 className="title">Language</h6>
			</a>
		</header>
		<div className="filter-content collapse show" id="collapse_7" >
			<div className="card-body">
				<form className="pb-3">
					<div className="input-group">
					<input type="text" className="form-control" placeholder="Search.."/>
					<div className="input-group-append">
						<button className="btn btn-light" type="button"><i className="fa fa-search"></i></button>
					</div>
					</div>
				</form>
				<label className="custom-control custom-checkbox">
				  <input type="checkbox" className="custom-control-input"/>
				  <div className="custom-control-label">Mercedes  
				  	<b className="badge badge-pill badge-light float-right">120</b>  </div>
				</label>
				<label className="custom-control custom-checkbox">
				  <input type="checkbox" className="custom-control-input"/>
				  <div className="custom-control-label">Toyota 
				  	<b className="badge badge-pill badge-light float-right">15</b>  </div>
				</label>
				<label className="custom-control custom-checkbox">
				  <input type="checkbox"  className="custom-control-input"/>
				  <div className="custom-control-label">Mitsubishi 
				  	<b className="badge badge-pill badge-light float-right">35</b> </div>
				</label>
				<label className="custom-control custom-checkbox">
				  <input type="checkbox"  className="custom-control-input"/>
				  <div className="custom-control-label">Nissan 
				  	<b className="badge badge-pill badge-light float-right">89</b> </div>
				</label>
				<label className="custom-control custom-checkbox">
				  <input type="checkbox" className="custom-control-input"/>
				  <div className="custom-control-label">Honda 
				  	<b className="badge badge-pill badge-light float-right">30</b>  </div>
				</label>
				<br></br>
				<button className="btn btn-block btn-primary">Apply</button>
			</div>
				
		</div>
	</article>
	<article className="filter-group">
		<header className="card-header bg-light rounded-0">
			<a href="#" data-toggle="collapse" data-target="#collapse_3" aria-expanded="true" className="text-dark">
				<i className="icon-control fa fa-chevron-down"></i>
				<h6 className="title">Price range </h6>
			</a>
		</header>
		<div className="filter-content collapse show" id="collapse_3" >
			<div className="card-body">
				{/*<input type="range" className="custom-range" min="0" max="100" name=""/>*/}
				<div className="form-row">
				<div className="form-group col-md-6">
				  <label>Min</label>
				  <input className="form-control" placeholder="$0" type="number"/>
				</div>
				<div className="form-group text-right col-md-6">
				  <label>Max</label>
				  <input className="form-control" placeholder="$1,0000" type="number"/>
				</div>
				</div>
				<button className="btn btn-block btn-primary">Apply</button>
			</div>
		</div>
	</article>
	<article className="filter-group">
		<header className="card-header bg-light rounded-0">
			<a href="#" data-toggle="collapse" data-target="#collapse_4" aria-expanded="true" className="text-dark">
				<i className="icon-control fa fa-chevron-down"></i>
				<h6 className="title">Raiting </h6>
			</a>
		</header>
		<div className="filter-content collapse show" id="collapse_4" >
			<div className="card-body">
			  <label className="checkbox-btn">
			    <input type="checkbox"/>
			    <span className="btn btn-light"> 1* </span>
			  </label>

			  <label className="checkbox-btn">
			    <input type="checkbox"/>
			    <span className="btn btn-light"> 2* </span>
			  </label>

			  <label className="checkbox-btn">
			    <input type="checkbox"/>
			    <span className="btn btn-light"> 3* </span>
			  </label>

			  <label className="checkbox-btn">
			    <input type="checkbox"/>
			    <span className="btn btn-light"> 4* </span>
			  </label>

			  <label className="checkbox-btn">
			    <input type="checkbox"/>
			    <span className="btn btn-light"> 5* </span>
			  </label>
			  <button className="btn btn-block btn-primary">Apply</button>
		</div>
		
		</div>
	</article>
	<article className="filter-group">
		<header className="card-header bg-light rounded-0">
			<a href="#" data-toggle="collapse" data-target="#collapse_5" aria-expanded="true" className="text-dark">
				<i className="icon-control fa fa-chevron-down"></i>
				<h6 className="title">Condition </h6>
			</a>
		</header>
		<div className="filter-content collapse show" id="collapse_5" >
			<div className="card-body">
			<label className="custom-control custom-checkbox">
				  <input type="checkbox" className="custom-control-input"/>
				  <div className="custom-control-label">Any condition  
				  	<b className="badge badge-pill badge-light float-right">120</b>  </div>
				</label>
				<label className="custom-control custom-checkbox">
				  <input type="checkbox" className="custom-control-input"/>
				  <div className="custom-control-label">Brand new  
				  	<b className="badge badge-pill badge-light float-right">120</b>  </div>
				</label>
				<label className="custom-control custom-checkbox">
				  <input type="checkbox" className="custom-control-input"/>
				  <div className="custom-control-label">Used items  
				  	<b className="badge badge-pill badge-light float-right">120</b>  </div>
				</label>
				<label className="custom-control custom-checkbox">
				  <input type="checkbox" className="custom-control-input"/>
				  <div className="custom-control-label">Very old  
				  	<b className="badge badge-pill badge-light float-right">120</b>  </div>
				</label>
				<br></br>
				<button className="btn btn-block btn-primary">Apply</button>
			</div>
		</div>
		
	</article> 
</div> 
	</div>
</div>
  )
}

export default Filters