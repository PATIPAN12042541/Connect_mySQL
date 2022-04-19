import React from 'react';

function Header(props) {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <div>
                    <a className="navbar-brand" href="#">
                        <img src="./image/EmbeddedImage.png" alt="" width="30" height="24" className="d-inline-block align-text-top"></img>
                        <span className="navbar-brand"> Globo Foods Ltd.</span>
                    </a>
                </div>
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </nav>
    );
}

export default Header;
