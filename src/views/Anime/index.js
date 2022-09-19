import {helperCre, addToFav} from "helper/helperCreat";
import { onHandleRoute } from "helper/route";
import './style.scss'
const Anime = (id = 28977) => {
    return fetch(`https://api.jikan.moe/v4/anime/${id}/full`)
        .then(res => res.json())
        .then(res_1 => {
            const metaWrap = helperCre('div', 'metaWrap')
            const wrap = helperCre('div', 'anime')
            const info = helperCre('div', 'anime__info')
            const img = helperCre('img', 'anime__info', null, null, res_1.data.images.jpg.large_image_url)
            const text = helperCre('div', 'anime__info-text')
            const top = helperCre('div', 'anime__info-text-top')
            const titles = helperCre('div', 'anime__info-text-titles')
            const title = helperCre('h2', 'anime__info-title', res_1.data.title_english ? res_1.data.title_english : res_1.data.title)
            const h3 = helperCre('h3', '', res_1.data.title_japanese)
            const score = helperCre('div', 'anime__info-text-score')
            const h3Sc = helperCre('h3', '', `${res_1.data.score}/10`)
            const pSc = helperCre('p', '', `By ${res_1.data.scored_by} users`)
            const pDesc = helperCre('p', 'anime__info-desc', res_1.data.synopsis)
            const categ = helperCre('div', 'anime__info-categ')
            const addFav = helperCre('button', 'anime__info-add', '♥ Favourites')
            addFav.addEventListener('click', () => addToFav(addFav,{'name': title.innerText, 'pic': res_1.data.images.jpg.large_image_url, 'id': id}))
            
            let favs = JSON.parse(localStorage.getItem('Favourites'))
            if (favs) favs.forEach(el => el.name == title.innerText ? addFav.classList.add('followed') : null)
            let favs2 = JSON.parse(localStorage.getItem('CurUser'))
            if (favs2) favs2.favourites.forEach(el => {
                el.name == title.innerText ? addFav.classList.add('followed') : null
            })

            const ul1 = helperCre('ul', '')
            const li1 = helperCre('li', '')
            li1.innerHTML = `<span>Type: </span>${res_1.data.type}`
            const li2 = helperCre('li', '')
            li2.innerHTML = `<span>Studio: </span>${res_1.data.studios.map(elem => elem.name).join(' ') || 'Unknown'}`
            const li3 = helperCre('li', '')
            li3.innerHTML = `<span>Genres: </span>${res_1.data.genres.map(elem => elem.name).join(', ')}`
            const li4 = helperCre('li', '')
            li4.innerHTML = `<span>Themes: </span>${res_1.data.themes.map(elem => elem.name).join(', ')}`
            const ul2 = helperCre('ul', '')
            const li5 = helperCre('li', '')
            li5.innerHTML = `<span>Status: </span>${res_1.data.status}${res_1.data.airing ? `<br><span>New episodes on</span>` : ''}`
            const li6 = helperCre('li', '')
            li6.innerHTML = `<span>Data aired: </span>${res_1.data.aired.string}`
            const li7 = helperCre('li', '')
            li7.innerHTML = `<span>Duration: </span>${res_1.data.duration}`
            const li8 = helperCre('li', '')
            li8.innerHTML = `<span>Favourite of </span>${res_1.data.favorites} users`  

            img.alt = res_1.data.title

            ul2.append(li5)
            ul2.append(li6)
            ul2.append(li7)
            ul2.append(li8)

            ul1.append(li1)
            ul1.append(li2)
            ul1.append(li3)
            ul1.append(li4)

            categ.append(ul1)
            categ.append(ul2)

            score.append(h3Sc)
            score.append(pSc)

            titles.append(title)
            titles.append(h3)

            top.append(titles)
            top.append(score)

            text.append(top)
            text.append(pDesc)
            text.append(categ)
            text.append(addFav)

            info.append(img)
            info.append(text)

            wrap.append(info)

            metaWrap.append(wrap)

            const soundOff = function (elem) {
                elem.addEventListener('click', () => soundOn(elem))
                video.volume = 0   
                volume.value = 0
                elem.innerText = '🔇'
            },
            soundOn = function (elem){
                elem.addEventListener('click', () => soundOff(elem))
                video.volume = 0.5
                volume.value = 50
                elem.innerText = '🔊'
            },
            pause = function (elem){
                elem.addEventListener('click', () => play(elem))
                video.pause()
                elem.innerText = '▶'
            },
            play = function (elem){
                elem.addEventListener('click', () => pause(elem))
                video.play()
                elem.innerText = '❚❚'
            },
            fullScreen = function() {
                if (document.fullscreenElement === null) {
                    player.requestFullscreen()
                } else {
                    document.exitFullscreen()
                }
            },
            progresUpdate = function (){
                let timee = Math.floor(video.currentTime),
                    duration = Math.floor(video.duration),
                    timeeMin = Math.floor(timee/60),
                    timeeH = Math.floor(timeeMin/60),
                    timeeSec = Math.ceil(timee%60),
                    durMin = Math.floor(duration/60),
                    durH = Math.floor(durMin/60),
                    durSec = Math.ceil(duration%60);

                timeline.value = (100 * video.currentTime) / video.duration
                time.innerText = `${(timeeH ? timeeH + ':' : '')}${(timeeH && timeeMin < 10 ? '0': '') + timeeMin}:${(timeeSec < 10 ? '0' : '') + timeeSec}/${(durH ? durH + ':' : '')}${(durH && durMin < 10 ? '0': '') + durMin}:${durSec}`
            },
            rewind = function (e){
                let val = e.offsetX/timeline.offsetWidth
                timeline.value = 100 * val
                video.currentTime = video.duration * val
            }

            const player = helperCre('div', 'player')
            const video = helperCre('video', 'player__video')
            video.src = 'https://cutt.ly/NCGeJIQ' 
            video.poster='https://cutt.ly/pCGqeiM'
            const controls = helperCre('div', 'player__controls')
            const btn1 = helperCre('button', 'player__controls-play', '▶')
            btn1.addEventListener('click', () => play(btn1))
            const time = helperCre('p', 'player__controls-time')
            const timeline = helperCre('input', 'player__controls-timeline')
            const btn3 = helperCre('button', 'player__controls-volume', '🔊')
            const volume = helperCre('input', 'player__controls-volume-range')
            volume.type = 'range'
            volume.value = 50
            video.volume = 0.5
            timeline.type = 'range'
            timeline.value = 0
            volume.addEventListener('click', function () {
                video.volume = volume.value/100
            })
            video.ontimeupdate = progresUpdate
            timeline.addEventListener('click', e => rewind(e) )
            btn3.addEventListener('click', () => soundOff(btn3, volume.value))
            const btn5 = helperCre('button', 'player__controls-full-scr', '⛶')
            btn5.addEventListener('click', () => fullScreen())

            controls.append(btn1)
            controls.append(time)
            controls.append(timeline)
            controls.append(btn3)
            controls.append(volume)
            controls.append(btn5)

            player.append(video)
            player.append(controls)

            metaWrap.append(player)

            fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`)
                .then(res => res.json())
                .then(res => {
                    const recW = helperCre('div', 'recc')
                    const recWSpan = helperCre('span', 'recc__top-span')
                    const recWHead = helperCre('h2', 'recc__top-header', 'You may also like:')
                    const recWTopW = helperCre('div', 'recc__top-top-wrap')

                    recWTopW.append(recWSpan)
                    recWTopW.append(recWHead)
                    recW.append(recWTopW)

                    res.data.slice(0, 4).forEach(el => {
                        let rAnimeW = helperCre('div', 'recc__anime-wrap'),
                        rAnimePic = helperCre('img', 'recc__anime-pic', null, null, el.entry.images.jpg.large_image_url),
                        rAnimeName = helperCre('h4', 'recc__anime-name', el.entry.title),
                        rAW = helperCre('a', '', null, `/anime=${el.entry.mal_id}`);
        
                        rAW.addEventListener('click', onHandleRoute)

                        rAW.append(rAnimePic)
                        rAW.append(rAnimeName)
                        rAnimeW.append(rAW)
                        
                        recW.append(rAnimeW)
                        res ? metaWrap.append(recW) : null
                    })
                })

            return metaWrap
        })
}
export default Anime;
