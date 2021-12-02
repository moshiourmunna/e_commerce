import React, {useState, useEffect, useCallback} from "react"
import axios from "axios"
import '../../../sass/orderPage.scss'
import CheckOut from "../card/CheckOut";
import Receipt from "../card/Receipt";
import OrderHistory from "../../helpers/OrderHistory";
import {useStateValue} from "../../helpers/StateProvider";

const ShowOrders = () => {

    let User = JSON.parse(window.localStorage.getItem('user'));
    const [{ user,basket,userDetail}, dispatch] = useStateValue();
    const userID = User?.user.id;
    const api = process.env.MIX_API;
    const [customer, setCustomer] = useState([])
    const [orders, setOrders] = useState([])
    const [sum, setSum] = useState([])
    const [data, setData] = useState([])

    const getOrders = useCallback(
        async () => {
            await axios.get(`${api}/cart/show/` + userID)
                .then(async (res) => {
                    setOrders(res.data)
                    console.log(res.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        [],
    );

    useEffect(async () => {
        getOrders().then(r => r)
    }, [getOrders]);

    useEffect(() => {
        const sum = customer?.reduce((amount, books) => (books.total * orders.length) + amount, 0);
        setSum(sum)
        const unique = [];
        basket.map(x => unique.filter(a => a.product_id === x.product_id).length > 0 ? null : unique.push(x));
        setData(unique)
    }, [basket]);


    return (
        <div className='orderPage'>
            <div className='customerInfo'>
                <div className='receipt'>
                    <h2>Details About Your Order</h2>
                    <hr/>
                    <Receipt
                        userID={userID}
                        name={user?.name}
                        email={user?.email}
                        basketData={data}
                    />
                </div>
            </div>
            <div className='orderInfo'>
                <div className='main'>
                    <div className='row'>
                        {data?.map(data => (
                            <CheckOut
                                key={data.title}
                                title={data.title}
                                author={data.author}
                                quantity={data.quantity}
                                price={data.price}
                                image={data.image}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowOrders
