import React from 'react';
import '../css/Main_nav.css';

const Mainnav = () => {
    return (
        <nav className="small_nav_1">
            <ul>
                <li><a href="#">오늘의 책</a></li>
                <li><a href="#monthbooks_wrap">이달의 책</a></li>
                <li><a href="#soaring_wrap">급상승</a></li>
            </ul>
        </nav>
    );
}

export default Mainnav;