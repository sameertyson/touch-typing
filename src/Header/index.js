import { Component } from 'react'
import './index.css'

class Header extends Component{
    render(){
        return<nav className="nav-container">
                    <p>time</p>
                    <div>
                        <div>
                            <input type='checkbox' className="custom-control-input" />
                            <label htmlFor=" "className='custom-control-input' >Correct Letter</label>
                        </div>
                    <a>Sound</a>
                    </div>
                </nav>
    }
}
export default Header