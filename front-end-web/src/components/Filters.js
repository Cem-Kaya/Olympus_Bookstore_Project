import React from 'react'
import './ExtraStyles.css'
import { useNavigate } from "react-router-dom"

const Filters = ({ products, params }) => {

	const navigate = useNavigate();
	let pr_lower = "*";
	let pr_upper = "*";

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

	const onCheckStateChangedArray = (category, value) => {
		if(!params[category].includes(value)) { 
			params[category] = [...params[category], value]
		}
		else{
			params[category] = params[category].filter((elem) => elem !== value)
		}
	}

	const onCheckStateChangedValue = (category, value) => {	
		params[category] = value
	}

	const setLowerPrice = (val) => {
		pr_lower = val
	}

	const setUpperPrice = (val) => {
		pr_upper = val
	}

  return (
    <div className="container">
		<div className="row">
		<div className="card text-light bg-secondary" style={{width: "32rem"}}>
			<article className="filter-group">
				<header className="card-header bg-light rounded-0">
					<a href="" data-toggle="collapse" data-target="#collapse_1" aria-expanded="true" className="text-dark">
						<i className="icon-control fa fa-chevron-down"></i>
						<h6 className="title">Author</h6>
					</a>
				</header>
				<div className="filter-content collapse show" id="collapse_1" >
					<div className="card-body">
						{/*<form className="pb-3">
							<div className="input-group">
							<input type="text" className="form-control" placeholder="Search.."/>
							<div className="input-group-append">
								<button className="btn btn-light" type="button"><i className="fa fa-search"></i></button>
							</div>
							</div>
						</form>*/}
						{
							getCounts("author").sort((a, b) => (a.count > b.count) ? -1 : 1).map((item,index) => (
								<label className="custom-control custom-checkbox" key={index}>
								<input type="checkbox" className="custom-control-input" onChange={() => {onCheckStateChangedArray("author", item.author)}}/>
								<div className="custom-control-label">{item.author}  
									<b className="badge badge-pill badge-light float-right">{item.count}</b>  </div>
								</label>
							))
						}
					</div>
						
				</div>
			</article>
			<article className="filter-group">
				<header className="card-header bg-light rounded-0">
					<a href="" data-toggle="collapse" data-target="#collapse_2" aria-expanded="true" className="text-dark">
						<i className="icon-control fa fa-chevron-down"></i>
						<h6 className="title">Publisher</h6>
					</a>
				</header>
				<div className="filter-content collapse show" id="collapse_2" >
					<div className="card-body">
						{/*<form className="pb-3">
							<div className="input-group">
							<input type="text" className="form-control" placeholder="Search.."/>
							<div className="input-group-append">
								<button className="btn btn-light" type="button"><i className="fa fa-search"></i></button>
							</div>
							</div>
						</form>*/}
						{
							getCounts("publisher").sort((a, b) => (a.count > b.count) ? -1 : 1).map((item,index) => (
								<label className="custom-control custom-checkbox" key={index}>
								<input type="checkbox" className="custom-control-input" onChange={() => {onCheckStateChangedArray("publisher", item.publisher)}}/>
								<div className="custom-control-label">{item.publisher}  
									<b className="badge badge-pill badge-light float-right">{item.count}</b>  </div>
							</label>
							))
						}
					</div>
						
				</div>
			</article>
			<article className="filter-group">
				<header className="card-header bg-light rounded-0">
					<a href="" data-toggle="collapse" data-target="#collapse_3" aria-expanded="true" className="text-dark">
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
						<input className="form-control" placeholder="0 TL" type="number" onChange={event => setLowerPrice(event.target.value)} onKeyDown={e => e.key === 'Enter' && onCheckStateChangedValue("pr_lower", pr_lower)}/>
						</div>
						<div className="form-group text-right col-md-6">
						<label>Max</label>
						<input className="form-control" placeholder="1,0000 TL" type="number" onChange={event => setUpperPrice(event.target.value)} onKeyDown={e => e.key === 'Enter' && onCheckStateChangedValue("pr_upper", pr_upper)}/>
						</div>
						</div>
					</div>
				</div>
			</article>
			<article className="filter-group">
				<header className="card-header bg-light rounded-0">
					<a href="" data-toggle="collapse" data-target="#collapse_4" aria-expanded="true" className="text-dark">
						<i className="icon-control fa fa-chevron-down"></i>
						<h6 className="title">Raiting </h6>
					</a>
				</header>
				<div className="filter-content collapse show" id="collapse_4" >
					<div className="card-body">
					<label className="checkbox-btn" onClick={() => {}}>
						<input type="checkbox" onChange={() => {onCheckStateChangedArray("raiting", "1")}}/>
						<span className="btn btn-light"> 1* </span>
					</label>

					<label className="checkbox-btn">
						<input type="checkbox" onChange={() => {onCheckStateChangedArray("raiting", "2")}}/>
						<span className="btn btn-light"> 2* </span>
					</label>

					<label className="checkbox-btn">
						<input type="checkbox" onChange={() => {onCheckStateChangedArray("raiting", "3")}}/>
						<span className="btn btn-light"> 3* </span>
					</label>

					<label className="checkbox-btn">
						<input type="checkbox" onChange={() => {onCheckStateChangedArray("raiting", "4")}} />
						<span className="btn btn-light"> 4* </span>
					</label>

					<label className="checkbox-btn">
						<input type="checkbox" onChange={() => {onCheckStateChangedArray("raiting", "5")}} />
						<span className="btn btn-light"> 5* </span>
					</label>
					</div>				
				</div>
				<button className="btn btn-block btn-primary" onClick={() =>{navigate(`/Search/category=${params.category}/&author=${params.author.length === 0 ? "*" : params.author}/&publisher=${params.publisher.length === 0 ? "*" : params.publisher}/&pr_lower=${pr_lower}/&pr_upper=${pr_upper}/&raiting=${params.raiting.length === 0 ? "*" : params.raiting}`)}}>Apply All</button>
			</article>
		</div> 
	</div>
</div>
  )
}

export default Filters