import {helperCre} from "helper/helperCreat";
import { onHandleRoute } from "helper/route";
import './style.scss'

const Auth = () => {
    const register = function(login, password){
        let users = JSON.parse(localStorage.getItem('Users')),
            fav = JSON.parse(localStorage.getItem('Favourites')),
            check = false,
            warn = document.querySelector('.auth__reg-warn'),
            user = {'login': login, 'password': password, 'id': users ? users.length + 1 : 0, 'favourites': []}

        if (!users) {
            localStorage.setItem('Users', JSON.stringify([user])) 
        } else {
            users.forEach(el => {
                if (el.login == login) check = true
            })
            
            if (warn) warn.remove()
            
            if (check) {
                reg.append(helperCre('p', 'auth__reg-warn', 'This login is already in use'))
            } else {
                users.push(user)
                localStorage.setItem('Users', JSON.stringify(users))
                reg.append(helperCre('p', 'auth__reg-warn', 'Your account has been created'))
            }
        }
    },

    login  = function(login, password){
        let users = JSON.parse(localStorage.getItem('Users')),
            favs = JSON.parse(localStorage.getItem('Favourites')),
            check = false,
            warn = document.querySelector('.auth__log-warn'),
            num;

        if (users) {
            users.forEach((el, i) => {
                if (el.login == login && el.password == password) {
                    check = true
                    num = i
                }
            })
        }
            
        if (check) {
            if (warn) warn.remove()
            document.querySelector('.header__prof-link').href = '/profile'
            if (favs) {
                let usFav = users[num].favourites

                for (var i = 0; i < favs.length; i++) { 
                    for (var j = 0; j < usFav.length; j++) { 
                        if (favs[i].name === usFav[j].name) {
                            usFav.splice(j, 1);
                            len2=usFav.length;
                        }
                    }
                }
                
                users[num].favourites.push(...favs)
                localStorage.setItem('Users', JSON.stringify(users))  
                localStorage.setItem('CurUser', JSON.stringify(users[num])) 
                localStorage.removeItem('Favourites')
            }
            localStorage.setItem('CurUser', JSON.stringify(users[num]))
        } else {
            if (!warn) log.append(helperCre('p', 'auth__log-warn', 'You have entered wrong login or password'))
        }
    };

    const wrap = helperCre('div', 'auth')
    const log = helperCre('div', 'auth__log')
    const reg = helperCre('div', 'auth__reg')
    const logHead = helperCre('h2', 'auth__log-head', 'Log In')
    const logForm = helperCre('form', 'auth__log-form')
    const regForm = helperCre('form', 'auth__reg-form')
    const regHead = helperCre('h2', 'auth__reg-head', 'Register')
    const logName = helperCre('input', 'auth__log-name')
    logName.type = 'text'
    logName.placeholder = 'Your login'
    const logPass = helperCre('input', 'auth__log-pass')
    logPass.type = 'password'
    logPass.placeholder = 'Password'
    const logBtn = helperCre('a', 'auth__log-btn', 'Submit', '/profile')
    logBtn.addEventListener('click', e => {login(logName.value, logPass.value), !document.querySelector('.auth__log-warn') ? onHandleRoute(e) : e.preventDefault()})

    const regName = helperCre('input', 'auth__reg-name')
    regName.type = 'text'
    regName.placeholder = 'Your login'
    const regPass = helperCre('input', 'auth__reg-pass')
    regPass.type = 'password'
    regPass.placeholder = 'Password'
    const regBtn = helperCre('a', 'auth__reg-btn', 'Submit', '/profile')
    regBtn.addEventListener('click', e => {e.preventDefault(); register(regName.value, regPass.value)})

    regForm.append(regHead)
    regForm.append(regName)
    regForm.append(regPass)
    regForm.append(regBtn)
    reg.append(regForm)

    logForm.append(logHead)
    logForm.append(logName)
    logForm.append(logPass)
    logForm.append(logBtn)
    log.append(logForm)


    wrap.append (log)
    wrap.append (reg)
    return wrap
}
export default Auth;
