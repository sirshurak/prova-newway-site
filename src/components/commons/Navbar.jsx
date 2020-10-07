import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';

function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='navbar'>
            {props.logo !== undefined ? <h1 className="navbar-logo">{props.logo}</h1> : <></>}
            <div className='menu-icon'>
                {
                    sidebar
                    ? <AiIcons.AiOutlineClose onClick={showSidebar}/>
                    : <FaIcons.FaBars onClick={showSidebar} />
                }
            </div>
            <ul className={`${sidebar ? 'nav-menu active' : 'nav-menu'} nav-menu-items`} onClick={showSidebar}>
                {props.items?.map((item, index) => {
                return (
                    <li key={index} className={`nav-link ${item.cName}`}>
                        <Link to={item.path}>
                            {item.icon}
                            {item.title !== "" ? <span>{item.title}</span> : <></>}
                            {item.content !== undefined ? item.content : <></>}
                        </Link>
                    </li>
                );
                })}
            </ul>      
         </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
