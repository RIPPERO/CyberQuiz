import React from 'react';
import "./Header.scss";
import { connect } from 'react-redux';

function Header(props) {
    return (
        <div className="headerContainer">
            <p className="font--big margin">{props.headerText}</p>
            <hr className="hr--main" />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        headerText: state.header.headerText,
    }
}

export default connect(mapStateToProps)(Header);
