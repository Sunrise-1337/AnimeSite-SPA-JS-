import {helperCre} from "helper/helperCreat";
import { onHandleRoute } from "helper/route";
import './style.scss'
const Search = () => {
    return fetch(`https://api.jikan.moe/v4/anime?q=${document.querySelector('.header__search').value}`)
        .then(res => res.json())
        .then(res => {
            const wrap = helperCre('div', 'search')
            if (res.data.length == 0) {
                let noRes = helperCre('h2', 'search__no-res', 'No results found')
                wrap.append(noRes)
            }
            res.data.forEach(el => {
                let animeA = helperCre('a', 'search__anime-link', null, '/anime=' + el.mal_id)
                let animeWrap = helperCre('div', 'search__anime')
                let animePic = helperCre('img', 'search__anime-pic', null, null, el.images.jpg.large_image_url)
                let animeHeader = helperCre('h2', 'search__anime-header', el.title_english ? el.title_english : el.title)
                let animeText = helperCre('div', 'search__anime-text')
                let animeDesc = helperCre('p', 'search__anime-desc', el.synopsis)

                animeA.addEventListener('click', onHandleRoute)

                animeWrap.append(animePic)
                animeText.append(animeHeader)
                animeText.append(animeDesc)
                animeWrap.append(animeText)
                animeA.append(animeWrap)
                wrap.append(animeA)
            })

            return wrap
        })
}
export default Search;
