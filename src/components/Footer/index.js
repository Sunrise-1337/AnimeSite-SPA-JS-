import './style.scss'
import { onHandleRoute } from "helper/route";
import { helperCre } from "helper/helperCreat";
import Scroll from 'img/scroll.png';
const Footer = () => {
    const footer = helperCre('footer', 'footer')
    const container = helperCre('div', 'container footer__org')
    const logoNav = helperCre('nav', 'footer__logo-nav')
    const logoW = helperCre('a', 'footer__logo-wrap', null, '/')
    logoW.addEventListener('click', onHandleRoute)
    const logo = helperCre('img', 'footer__logo', null, null, 'https://technext.github.io/anime/img/logo.png')
    const btn = helperCre('a', 'footer__btn', null, '#')
    const btnImg = helperCre('img', 'footer__btn-pic', null, null, Scroll)
    btn.addEventListener('click', e => {e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' })})
    const pWrap = helperCre('nav', 'footer__pages-wrap')
    const a1 = helperCre('a', 'footer__link', 'Homepage', '/')
    a1.addEventListener('click', onHandleRoute)
    const a2 = helperCre('a', 'footer__link', 'Anime', '/anime')
    a2.addEventListener('click', onHandleRoute)
    const a3 = helperCre('a', 'footer__link', 'Product', '/product')
    a3.addEventListener('click', onHandleRoute)
    const a4 = helperCre('a', 'footer__link', '404', '/404')
    a4.addEventListener('click', onHandleRoute)
    const p = helperCre('p', 'footer__p', `Copyright ©${new Date().getFullYear()} All rights reserved`)

    logoW.append(logo)
    logoNav.append(logoW)
    pWrap.append(a1)
    pWrap.append(a2)
    pWrap.append(a3)
    pWrap.append(a4)
    btn.append(btnImg)
    container.append(btn)
    container.append(logoNav)
    container.append(pWrap)
    container.append(p)
    footer.append(container)
    
    return footer
}
export default Footer;