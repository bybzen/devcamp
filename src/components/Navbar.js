import React from 'react';
import '../css/App.css'
import {useHistory} from 'react-router-dom'

function Navbar(){
    const history = useHistory()
    function home(){
        history.replace('/account')
    }
    return(
        <div>
            <header className="Navbar">
                <body className="Head">
                    <div class="title" onClick={home}>Papoy.</div>
                </body>
            </header>
        </div>
    );
}
export default Navbar;