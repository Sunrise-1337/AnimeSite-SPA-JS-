import {helperCre, addToFav} from "helper/helperCreat";
import { onHandleRoute } from "helper/route";
import './style.scss'
const Profile = () => {
    let data = JSON.parse(localStorage.getItem('CurUser'));
    const wrap = helperCre('div', 'profile')
    const userInfo = helperCre('div', 'profile__user')
    const userPic = helperCre('img', 'profile__user-pic', null, null, 'https://cutt.ly/4ViE9ff')
    const userLogin = helperCre('div', 'profile__user-login', data.login)
    const userLogout = helperCre('a', 'profile__user-logout', 'Log Out', '/auth')
    userLogout.addEventListener('click', e => {localStorage.removeItem('CurUser'); document.querySelector('.header__prof-link').href = '/auth' ; onHandleRoute(e)})
    const favs = helperCre('div', 'profile__favs')
    const favsSpan = helperCre('span', 'profile__favs-span')
    const favsHead = helperCre('h2', 'profile__favs-header', 'Your favourites')
    const favsTopWrap = helperCre('div', 'profile__favs-top-wrap')

    userInfo.append(userLogout)
    userInfo.append(userPic)
    userInfo.append(userLogin)
    wrap.append(userInfo)

    if (data.favourites){
        favsTopWrap.append(favsSpan)
        favsTopWrap.append(favsHead)
        favs.append(favsTopWrap)

        data.favourites.forEach(el => {
            let pic = helperCre('img', 'profile__favs-anime-image', null, null, el.pic),
                name = helperCre('h2', 'profile__favs-anime-header', el.name),
                favAWrap = helperCre('a', 'profile__favs-anime', null, `/anime=${el.id}`),
                like = helperCre('a', 'profile__favs-like followed', null, '#'),
                likePic = helperCre('img', 'profile__favs-like-pic', null, null, 'https://cutt.ly/jVohlRo');

            like.addEventListener('click', (e) => {e.preventDefault(); addToFav(like, {'name': el.name, 'pic': el.pic, 'id': el.id})})
            like.append(likePic)
            favAWrap.append(like)
            favAWrap.append(pic)
            favAWrap.append(name)
            favAWrap.addEventListener('click', onHandleRoute)
            favs.append(favAWrap)
        })
    }

    wrap.append(favs)

    return wrap
}
export default Profile;
