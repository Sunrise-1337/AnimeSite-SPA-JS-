import {helperCre} from "helper/helperCreat";
import { onHandleRoute } from "helper/route";
import './style.scss'
const AnimeRec = () => {
    return fetch(`https://api.jikan.moe/v4/recommendations/anime`)
        .then(res => res.json())
        .then(res => {
            const wrap = helperCre('div', 'rec')
            res.data.slice(0, 19).forEach(el => {
                let recWrap = helperCre('div', 'rec__reccom')
                let recHeader = helperCre('h2', 'rec__header', `"${el.content}"`)
                let recAuthor = helperCre('h2', 'rec__author', '@' + el.user.username)

                recWrap.append(recHeader)
                recWrap.append(recAuthor)

                el.entry.forEach(el => {
                    let recPic = helperCre('img', 'rec__pic', null, null, el.images.jpg.large_image_url)
                    let recTitle = helperCre('h2', 'rec__title', el.title)
                    let recAnimeWrap = helperCre('div', 'rec__anime-wrap')
                    let recA = helperCre('a', 'rec__anime-link', null, '/anime='+el.mal_id)
                    recA.addEventListener('click', onHandleRoute)

                    recAnimeWrap.append(recPic)
                    recAnimeWrap.append(recTitle)
                    recA.append(recAnimeWrap)
                    recWrap.append(recA)
                })

                wrap.append(recWrap)
            })

            return wrap
        })
}
export default AnimeRec;
