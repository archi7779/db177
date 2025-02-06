import {useState} from "react";
import * as styles from './App.module.scss'
import {Link, Outlet} from "react-router-dom";

export const App = () => {
    const [count, setCount] = useState(0)
    const increment = ()=> setCount( prev => prev + 1)
    if(__PLATFORM__ === 'mobile'){
        return <div>MobileVersion</div>
    }
    return (
        <div>
            <h1>PLATFORM={__PLATFORM__}</h1>
            <div className={styles.test}>
                <p>{count}</p>
                <div onClick={increment}>INCREMENT</div>
            </div>
            <br />
            <div>
                <Link to={'/about'}>See About Info</Link>
            </div>
            <div>
                <Link to={'/shop'}>See Shop</Link>
            </div>
            <Outlet/>
        </div>

    )

}