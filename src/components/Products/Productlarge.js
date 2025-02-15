import React,{useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Allproducts from "./Allproducts";
import Productdata from './productdata.json';
import { useDispatch } from "react-redux";
import { addtocart } from '../../Store/action.js'
import { useContext } from "react";
import { DarkModeContext } from "../../App";

export default function Productlarge() {
    const mode = useContext(DarkModeContext)
    const textColor = mode === 'dark' ? 'light' : 'dark'
    const [ifadded,setifadded]=useState(false);
    const { state } = useLocation();
    const upcost = (4 * state.cost / 3).toFixed(2);
    window.scrollTo(0, 0);
    const spinner='<span class="spinner-border spinner-border"/>';
    const added='Added <i class="bi bi-check-lg ms-1"></i>';
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function handleaddtocart() {
        dispatch(addtocart(state));
        const button=document.getElementById("addtocartbtn");
        button.innerHTML=spinner;
        setTimeout(()=>{
            setifadded(true);
            button.innerHTML=added;
        },2000)
    }
    function handlebuynow(){
        dispatch(addtocart(state));
        navigate('/checkout/info')
    }
    return (
        <>
            <div className="container d-flex justify-content-center">
                <div className="bg-white align-items-center justify-content-center d-flex object-fit-contain m-5 rounded-4" style={{width:"40%"}} >
                    <img className=" d-block m-3 object-fit-contain" src={state.image} alt="not loading" style={{ maxHeight: "500px", maxWidth: "400px" }} />
                </div>
                <div className="w-50">
                    {/* <h1 className="m-5">item id={state.id}</h1> */}
                    <p className="mx-5 mt-5 text-warning ">Category - <span className="bg-warning text-dark rounded px-2">{state.category}</span></p>
                <h2 className={`mx-5 text-light mb-3`} style={{ fontFamily: "Times New Roman", textShadow: '0 0 5px blue' }}>{state.title}</h2>
                    <h5 className="text-success ms-5" style={{ margin: "0px" }}>Special Price</h5>
                    <h2 className={`mx-5 mt-1 d-flex text-${textColor} align-items-center`}>MRP:
                        <div className="text-muted text-decoration-line-through mx-2 fs-3 "> ${upcost} </div>
                        ${state.cost}
                        <div className="text-success mx-4">25% off</div>
                    </h2>
                    <p className="ms-5 my-3 bg-success text-white rounded-5 px-3 d-inline fs-4 align-items-center">{state.rating.rate}<i className="ms-1 bi bi-star-fill fs-5"></i></p>
                    <p className={`text-muted d-inline ms-2`}>{state.rating.count} reviews</p><br />
                    <p className="ms-5 my-3 bg-body-tertiary text-secondary rounded-5 px-3 fs-6 align-items-center d-inline">Free Delivery</p>
                    <p className={`mx-5 my-3 fs-5 text-${textColor}`}>{state.description}</p>
                    <div className="mx-5 d-flex mt-5 justify-content-evenly">
                        <div className={`btn ${ifadded?"btn-success":"btn-outline-primary"} btn-lg`} id="addtocartbtn" style={{width:"45%"}} onClick={handleaddtocart}>Add to cart</div>
                        <div className="btn btn-primary btn-lg" style={{width:"45%"}} onClick={handlebuynow}>Buy now</div>
                    </div>
                </div>
            </div>
            <div className="container">

            <h1 className="m-5 mb-2">You might be intrested in <i className="bi bi-arrow-right"/></h1>
            </div>
            <hr style={{width:"80%",marginLeft:"10%"}}/>
            <Allproducts data={Productdata}/>
        </>
    )
}