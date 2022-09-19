import './styles/all'
import Header from "components/Header"
import Footer from './components/Footer';
import { onLocation } from "helper/route";
document.body.prepend(Header())
Array.from(document.querySelectorAll('.header__link'))
    .find(elem => 
        elem.href.replace(/http.+\//igm, '/') == window.location.pathname
).classList.add('active-link')
onLocation()
document.body.append(Footer())