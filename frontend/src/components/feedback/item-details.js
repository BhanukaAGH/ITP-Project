import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {Button} from "antd";
import {MinusOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function ItemDetails(props) {

    const [amount, setAmount] = useState(1);

    const {category, brand, model, description, dimensions, weight, available, price, images} = props.productDetails;

    const handleBuy = () => {
        // Logic for buind the product.
    }

    const handleOrder = () => {
        // Logic for ordering a product
    }

    return (
        <div className="container container-md">

            <div className="row">

                <div className="col-md-4 mx-0 p-3">
                    <img src={images && images[0] ? images[0] : 'https://bulma.io/images/placeholders/256x256.png" className="w-100'} style={{maxWidth: '100%', maxHeight: '100%'}}/>
                </div>

                <div className="col-md-8 mx-0 p-3">
                    <table className="table table-striped" style={{fontSize: '16px'}}>
                        <tbody>
                        <tr className="">
                            <th scope="row" style={{textAlign: 'right', width: '100px'}}>Category</th>
                            <td>{category ? category.substring(0, 1).toUpperCase() + category.substring(1) : ''}</td>
                        </tr>
                        <tr>
                            <th scope="row" style={{textAlign: 'right'}}>Brand</th>
                            <td>{brand}</td>
                        </tr>
                        <tr>
                            <th scope="row" style={{textAlign: 'right'}}>Model</th>
                            <td>{model}</td>
                        </tr>
                        <tr>
                            <th scope="row" style={{textAlign: 'right'}}>Description</th>
                            <td>{description}</td>
                        </tr>
                        <tr>
                            <th scope="row" style={{textAlign: 'right'}}>Dimensions</th>
                            <td>{dimensions ? dimensions.width + 'x' + dimensions.length + 'x' + dimensions.height + dimensions.unit: ''}</td>
                        </tr>
                        <tr>
                            <th scope="row" style={{textAlign: 'right'}}>Weight</th>
                            <td>{weight ? weight.value + weight.unit : ''}</td>
                        </tr>
                        <tr>
                            <th scope="row" style={{textAlign: 'right'}}>Available</th>
                            <td>{available ? available + ' items left' : (<span className="text-danger">Out of stock.</span>)}</td>
                        </tr>
                        <tr>
                            <th scope="row" style={{textAlign: 'right'}}>Price</th>
                            <td>{price ? 'Rs.' + price + '/=' : ''}</td>
                        </tr>
                        </tbody>
                    </table>

                    <div className="row">
                        <div className="col-md-7">
                            <span className="fw-bold">Quantity</span>
                            <Button className="mx-3" shape="circle" icon={<MinusOutlined />} size="small" disabled={amount <= 1} onClick={() => setAmount(amount - 1)}/>
                            <span className="fw-bold">{amount}</span>
                            <Button className="mx-3" shape="circle" icon={<PlusOutlined />} size="small" disabled={amount >= available} onClick={() => setAmount(amount + 1)}/>
                            <Link type='button' to='/payment' className="btn btn-primary m-1" type="button" onClick={handleBuy}>Buy Now</Link>
                            <Link type='button' to='/orders' className="btn btn-secondary m-1" type="button" onClick={handleOrder}>Order</Link>
                        </div>
                        <div className="col-md-5 d-flex flex-row-reverse" style={{marginTop: '10px'}}>
                            <i style={{fontSize: '32px'}} className="fab fa-cc-visa mx-1" />
                            <i style={{fontSize: '32px'}} className="fab fa-cc-mastercard" />
                            <i style={{fontSize: '32px'}} className="fab fa-cc-paypal mx-1" />
                            <i style={{fontSize: '32px'}} className="fab fa-cc-amex" />
                        </div>
                    </div>

                </div>

            </div>

        </div>

    );
}
