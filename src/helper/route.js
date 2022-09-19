import Home from "views/Home"
import ErrorPage from "views/ErrorPage"
import Product from "views/Product";
import Auth from "views/Auth";
import Anime from "views/Anime";
import Profile from "../views/Profile";
import Search from "../views/Search";
import AnimeRec from "../views/AnimeRec";
import { Carousel } from "@fancyapps/ui";
import { Autoplay } from "@fancyapps/ui/dist/carousel.autoplay.esm.js";

const onHandleRoute = (e) => {
    e = e || e.window
    e.preventDefault()
    let close = e.target.closest('a')
    if (document.querySelector('.active-link')) document.querySelector('.active-link').classList.remove('active-link')
    if (close && close.classList.contains('header__link')) {
        close.classList.add('active-link')
    }
    window.history.pushState({}, '', close.href)
    onLocation()
}

const routes = {
    '404': ErrorPage(),
    '/': Home(),
    '/anime': AnimeRec(),
    '/product': Product(),
    '/auth': Auth(),
}

const onLocation = async () => {
    const {pathname} = window.location
    let curLink = document.querySelector('.header__pages-wrap').querySelector(`a[href="${pathname}"]`)
    if (!document.querySelector('.active-link') && curLink) curLink.classList.add('active-link')
    if (pathname.replace(/[0-9]/g, '') == '/anime='){
        routes['/anime='] = Anime(pathname.replace(/[^0-9]/g, '') != '' ? pathname.replace(/[^0-9]/g, '') : null)
        document.querySelector('.header__pages-wrap').querySelector(`a[href="/anime"]`).classList.add('active-link')
    }
    if (pathname == '/profile'){
        routes['/profile'] = Profile()
    }
    if (pathname == '/search'){
        routes['/search'] = Search()
    }
    let id = pathname.replace(/[^0-9]/g, '') != '404' ? pathname.replace(/[0-9]/g, '') : pathname
    const route = await routes[id] || routes[404]
    const main = document.getElementById('main')
    main.innerHTML = '';
    main.append(route)
    window.scrollTo({ top: 0, behavior: 'smooth' })

    let carousel = document.querySelector("#mainCarousel")
    if (carousel){
        Carousel.Plugins.Autoplay = Autoplay;
        document.querySelectorAll('.carousel__hide').forEach(elem => elem.addEventListener('click', () => elem.remove()))
        const mainCarousel = new Carousel(carousel, {Autoplay: {timeout: 5000},});
    }
}

window.onpopstate = onLocation
window.route = onHandleRoute

export { onHandleRoute, onLocation }

