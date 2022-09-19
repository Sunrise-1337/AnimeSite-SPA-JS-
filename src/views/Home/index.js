import {helperCre} from "helper/helperCreat";
import Slider from "../../components/Slider";
import { onHandleRoute } from "helper/route";
import './style1.scss'
const Home = async () => {
    let slider = await Slider()
    
    const bigW = helperCre('div', 'wrap')
    const home = helperCre('div', 'home')
    const topA = helperCre('div', 'home__top-anime')
    const topC = helperCre('div', 'home__top-char')
    const topCSpan = helperCre('span', 'home__top-char-span')
    const topCHead = helperCre('h2', 'home__top-char-header', 'Top Characters')
    const topTopCWrap = helperCre('div', 'home__top-char-top-wrap')
    topTopCWrap.append(topCSpan)
    topTopCWrap.append(topCHead)
    topC.append(topTopCWrap)

    const topASpan = helperCre('span', 'home__top-anime-span')
    const topAHead = helperCre('h2', 'home__top-anime-header', 'Trending now')
    const topTopWrap = helperCre('div', 'home__top-anime-top-wrap')
    topTopWrap.append(topASpan)
    topTopWrap.append(topAHead)
    topA.append(topTopWrap)

    fetch('https://api.jikan.moe/v4/top/anime')
        .then(res => res.json())
        .then(res => res.data.slice(0,18).forEach(el => {
            let animeW = helperCre('div', 'home__anime-wrap'),
                animePic = helperCre('img', 'home__anime-pic', null, null, el.images.jpg.large_image_url),
                animeThemeWrap = helperCre('div', 'home__anime-theme-wrap'),
                animePicWrap = helperCre('div', 'home__anime-pic-wrap'),
                animeType = helperCre('h2', 'home__anime-type', el.type),
                animeFav = helperCre('h2', 'home__anime-fav', '♥ ' + el.favorites),
                animeName = helperCre('h4', 'home__anime-name', el.title),
                aW = helperCre('a', '', null, `/anime=${el.mal_id}`);

            aW.addEventListener('click', onHandleRoute)
            el.themes.forEach(el=>{
                let topic = helperCre("h5", 'home__anime-topic', el.name)
                animeThemeWrap.append(topic)
            })
            animePicWrap.append(animePic)
            animePicWrap.append(animeType)
            animePicWrap.append(animeFav)
            aW.append(animePicWrap)
            aW.append(animeThemeWrap)
            aW.append(animeName)
            animeW.append(aW)
            
            topA.append(animeW)
        }))

    fetch('https://api.jikan.moe/v4/top/characters')
        .then(res => res.json())
        .then(res => res.data.slice(0,4).forEach(el => {
            let charW = helperCre('div', 'home__char-wrap'),
            charPic = helperCre('img', 'home__char-pic', null, null, el.images.jpg.image_url),
            charName = helperCre('h4', 'home__char-name', el.name);
            charW.append(charPic)
            charW.append(charName)
            topC.append(charW)
        }))

    home.append(topA)
    home.append(topC)
    bigW.append(slider)
    bigW.append(home)
    return bigW
}
export default Home;
