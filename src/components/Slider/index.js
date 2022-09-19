import './style1.scss'
import {helperCre} from "helper/helperCreat";
import { onHandleRoute } from "helper/route";
const Slider = () => {
    // Проверка текста
    const checkLine = (el) => {
        let check = el.data.synopsis.split(' ').splice(0,20)
        let reg = /[ \. | \, | \; | \! | \?]/
        if (reg.test(check[check.length-1])) {
            check[check.length-1] = check[check.length-1].replace(reg, '')
        }
        return check.join(' ') + '...'
    }
    // Отрисовка слайдов
    const links = [],
    results = [];
    for (let i = 0; i < 3; i++) {
        let i = fetch('https://api.jikan.moe/v4/random/anime')
            .then(res => res.json())
        links.push(i)
    }
    return Promise.all(links)
        .then(res => res.forEach(elem => results.push({check: elem.data.rating,img: elem.data.images.jpg.large_image_url, title: elem.data.title_english ? elem.data.title_english : elem.data.title, desc: elem.data.synopsis ? checkLine(elem) : '', url: elem.data.url, id: elem.data.mal_id})))
        .then(() => {
            let slider = helperCre('div', 'carousel');
            slider.setAttribute('id', 'mainCarousel')
            results.forEach(elem => {
                let slide = helperCre('div', 'carousel__slide'),
                    hide = helperCre('div', 'carousel__hide'),
                    hideHead = helperCre('h3', null, 'NSFW content'),
                    hideP = helperCre('p', null, 'Do you want to allow it?'),
                    img = helperCre('img', 'pic'),
                    textW = helperCre('div', 'carousel__text-wrap'),
                    textHead = helperCre('div', 'carousel__header', elem.title),
                    textPara = helperCre('div', 'carousel__para', elem.desc),
                    textBtn = helperCre('button', 'carousel__btn', 'Watch >'),
                    a = helperCre('a', '', null, `/anime=${elem.id}`)

                    a.addEventListener('click', onHandleRoute)
                    
                    img.setAttribute('data-lazy-src', elem.img)

                    textW.append(textHead)
                    textW.append(textPara)
                    a.append(textBtn)
                    textW.append(a)

                    hide.append(hideHead)
                    hide.append(hideP)

                    if (/(^Rx)|(mild nudity)/i.test(elem.check)) slide.append(hide)
                    slide.append(img)
                    slide.append(textW)
                    slider.append(slide)
            })
            return slider
        })
}
export default Slider;