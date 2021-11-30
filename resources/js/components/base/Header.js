import React, {useState, useEffect, useCallback} from 'react'
import {Link, NavLink} from 'react-router-dom'
import {useLocation} from "react-router-dom";
import '../../../sass/header.scss'
import {IoIosArrowDropdown} from 'react-icons/io';
import a from '../../assets/logo.png'
import SearchCard from "../card/SearchCard";
import CartBox from "../card/CartBox";
import {BiAddToQueue} from 'react-icons/bi';
import {FaRegEdit} from 'react-icons/fa';
import {BsList} from 'react-icons/bs';
import {useStateValue} from "../../helpers/StateProvider";
import axios from "axios";

const Header = () => {

    const [{user, basket}, dispatch] = useStateValue();
    let admin = process.env.MIX_ADMIN;
    const [modal, setModal] = useState(false);
    const url = location.pathname


    async function logout() {
        console.log('url', url)
        window.localStorage.clear();
        window.location.replace('/home');
    }

    return (

        <div>
            <div className='navbar'>
                <CartBox/>
                {/*{*/}
                {/*    (user?.user)?*/}
                {/*        <div>*/}
                {/*        <CartBox/>*/}
                {/*        </div>*/}
                {/*        :*/}
                {/*        <div>*/}
                {/*        </div>*/}
                {/*}*/}
                {
                    (user?.email === admin) ?
                        <>
                            <div className='nav-ul'>
                                <ul>
                                    <li className='home-logo-admin'>
                                        <NavLink to='/home'>
                                            <img className='logo' src={a}/>
                                        </NavLink>
                                    </li>

                                    <li><NavLink to='/add'>
                                        <BiAddToQueue size='29px' color='#363636'/>
                                        Add
                                    </NavLink></li>

                                    <li><NavLink to='/edit'>
                                        <FaRegEdit size='27px' color='#363636'/>
                                        Edit
                                    </NavLink></li>

                                    <li><NavLink to='/adminOrders'>
                                        <BsList size='27px' color='#363636'/>
                                        Orders
                                    </NavLink></li>
                                </ul>
                            </div>
                        </>
                        :
                        <>
                            <div className='nav-ul'>
                                <ul>
                                    <li className='home-logo'>
                                        <NavLink to='/home'>
                                            <img className='logo' src={a} alt=''/>
                                        </NavLink>
                                    </li>
                                    <SearchCard/>
                                </ul>
                            </div>
                        </>
                }
            </div>

            {(user?.email) ?
                <div className='user-name-nav' style={{cursor: 'pointer'}} onClick={() => setModal(!modal)}>
                    <p>
                        {user?.name}
                        <span><IoIosArrowDropdown style={{cursor: 'pointer'}} color='black'/> </span>
                    </p>
                    <span className={modal ? 'modal-logout' : 'hide'}>
                        <NavLink to='/cart' className='modal-cart'> Your Cart</NavLink>
                        <br/>
                        <hr/>
                        <button onClick={logout}>Log Out</button>
                    </span>
                </div>
                :
                <div className='user-name-nav-withoutUser'>
                    <NavLink to='/login'> Log In</NavLink>
                </div>
            }
            <hr/>
        </div>
    )
}
export default Header
