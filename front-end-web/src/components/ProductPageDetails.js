import React from 'react'
import styled from 'styled-components'
import { getUserID } from '../helperFunctions/helperLogin';
import './ExtraStyles.css'

const Line = styled.div`
    height: 1px;
    background-color: #f7f7f7;
    border: none;
    margin-top: 10px;
`;

const Description = styled.div`
    max-width: 1000px;
    overflow-wrap: break-word;
    word-wrap: break-word;
    margin: 0 auto;
    text-align: left;
`;

const ProductPageDetails = ({item, onAddToCart, reviews, onSendComment, onAddToWishList}) => {
    console.log(item)
    let comment = ""
    let raiting = "1"

    const onCommentChange = (val) => {
        comment = val
    }
    const onRaitingChange = (val) => {
        raiting = val
        console.log(raiting)
    }

    const stars = (element) => {
        let arr = []
        for(var i = 0; i < element.stars; i++){
            arr.push(<i className="fa fa-star text-light"></i>)
        }
        return arr
    }

    const productRaiting = (element) => {
        let arr = []
        for(var i = 0; i < element.raiting; i++){
            arr.push(<i className="fa fa-star text-light"></i>)
        }
        return arr
    }
    
  return (
    item === undefined ? <></>
    :
    <div>    
        <div className="container mt-5 mb-5 bg-dark">
    <div className="row d-flex justify-content-center">
        <div className="col-md-12">
            <div className="card bg-secondary text-light">
                <div className="row">
                    <div className="col-md-6">
                        <div className="images p-3">
                            <div className="text-center p-4">{console.log(item)} <img id="main-image" alt="img0" src={item.img} width="250" /> </div>
                            <div className="thumbnail text-center"> <img src={item.img1} alt="img1" width="70"/> <img src={item.img2} alt="img2" width="70"/> </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="product p-4">
                            <div className="mt-4 mb-3"> 
                                <h5 className="text-uppercase float-md">{item.title}</h5>
                            </div>
                            
                            <hr className='bg-light'/>
                            <div className='row-md-12 mt-12 mb-3'>
                            <span className="text-uppercase text-light brand float-left">{"Author: " + item.author}</span><br></br>
                            </div>
                            <div className='row-md-12 mt-12 mb-3'>
                            <span className="text-uppercase text-light brand float-left">{"Publisher: " + item.publisher}</span><br></br>
                            </div>
                            <div className='row-md-12 mt-12 mb-3'>
                            <span className="text-uppercase text-danger brand float-left">{item.amount_sold + " sold. " + item.in_stock + " remained in stock"}</span><br></br>
                            </div>
                            <div className='row-md-12 mt-12 mb-3'>
                            <span className="text-uppercase text-warning brand float-left">{item.discount + " discount. " + item.price + " TL is the new price"}</span><br></br>
                            </div>
                            <div className='row-md-12 mt-12 mb-3'>
                            <span className="text-uppercase text-white brand float-left">Raiting: {productRaiting(item)}</span><br></br>
                            </div>
                            <div className='row-md-12 mt-12 mb-3'>
                            <span className="text-uppercase text-white brand float-left"><p class="h4">{item.price} TL</p></span><br></br>
                            </div>
                        </div>
                        <br></br>
                            <div className="cart mt-4 align-items-center">
                                {item.in_stock === 0 ? <button className="btn btn-danger text-uppercase mr-2 px-4" disabled={true}>SOLD OUT</button>
                                 :<button className="btn btn-danger text-uppercase mr-2 px-4" onClick={() => {onAddToCart(item)}}>Add to cart</button>} 
                              
                                <button data-original-title="Save to Wishlist" title="" className="btn btn-light mr-2" data-toggle="tooltip" onClick={() => {onAddToWishList(item)}}> <i className="fa fa-heart"></i></button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br></br><br></br>
    <Line/>
    </div>
    
    <div className="container mt-5 mb-5 text-light">
        <div className="row row-underline"><span className=" deal-text float-left "><h4>Description</h4></span> </div>
        <br></br>
        <div className="row row-underline"><Description><p>{item.description}</p></Description></div>
        <Line/>
    </div>
    <div className="container mt-5 mb-5">
    <div className="row row-underline text-light">
                <div className="col-md-6"> <span className=" deal-text float-left"><h4>Other Details</h4></span> </div><br></br>
            </div>
            <br></br>
            <div className="row text-light">
                <div className="col-md-12">
                    <table className="col-md-12">
                        <tbody>
                            <tr className="row mt-10">
                                <td className="col-md-4"><span className="p_specification">Edition Number:</span> </td>
                                <td className="col-md-8">
                                    <ul>
                                        <li>{item.edition_number}</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr className="row mt-10">
                                <td className="col-md-4"><span className="p_specification">Model Number:</span> </td>
                                <td className="col-md-8">
                                    <ul>
                                        <li>{item.model}</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr className="row mt-10">
                                <td className="col-md-4"><span className="p_specification">Start of Sale Date:</span> </td>
                                <td className="col-md-8">
                                    <ul>
                                        <li>{item.release_date.split(" ")[0]}</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr className="row mt-10">
                                <td className="col-md-4"><span className="p_specification">Warranty:</span> </td>
                                <td className="col-md-8">
                                    <ul>
                                        <li>{item.warranty}</li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Line/>
            </div>
            
            <section className="content-item" id="comments">
    <div className="container text-light">   
    	<div className="row">
            <div className="col-sm-8">   
                <form>
                	<h3 className="pull-left float-left text-light">New Comment</h3><br></br><br></br>
                    <div className="rating float-left"> <input type="radio" name="rating" value="5" onChange={event => onRaitingChange(event.target.value)} id="5"/><label htmlFor="5">☆</label> <input type="radio" name="rating" value="4" onChange={event => onRaitingChange(event.target.value)} id="4"/><label htmlFor="4">☆</label> <input type="radio" name="rating" value="3" onChange={event => onRaitingChange(event.target.value)} id="3"/><label htmlFor="3">☆</label> <input type="radio" name="rating" value="2" onChange={event => onRaitingChange(event.target.value)} id="2"/><label htmlFor="2">☆</label> <input type="radio" name="rating" value="1" onChange={event => onRaitingChange(event.target.value)} id="1"/><label htmlFor="1">☆</label>
                    </div>
                    {
                        getUserID() === undefined || getUserID() === null || getUserID() === "" ?
                        <button type="submit" className="btn btn-normal pull-right btn-danger" disabled={true}>Submit</button>
                        :
                        <button type="submit" className="btn btn-normal pull-right btn-danger" onClick={() => {onSendComment(comment, raiting)}}>Submit</button>
                    }
                    <fieldset>
                    <br></br>
                        <div className="row">
                            <div className="form-group col-xs-12 col-sm-9 col-lg-10">
                                <textarea className="form-control" id="message" placeholder="Your message" required="" onChange={event => onCommentChange(event.target.value)}></textarea>
                            </div>
                        </div>  	
                    </fieldset>
                </form>
                <h3 className='text-light'>{reviews.length + " Comments"}</h3>
                <Line></Line>
                    {console.log(reviews)}
                    {reviews.map(element => (
                        <div className="container mt-5 mb-5 border">
                            <br></br>
                            <div className="media-body text-light">
                            <h4 className="media-heading float-left">{element.uid}</h4><br></br><br></br>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="ratings">
                                    {stars(element)}
                                </div>
                            </div>
                            <br></br>
                            <p className='float-left'>{element.text}</p>
                            <br></br><br></br>
                            {/*<ul className="list-unstyled list-inline media-detail pull-left">
                                <li><i className="fa fa-calendar"></i>27/02/2014</li>
                            </ul>*/}
                        </div>
                    </div>
                    ))
                    }
            </div>
        </div>
    </div>
</section>
            </div>
  )
}

export default ProductPageDetails