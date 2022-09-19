const helperCreate = (tag, id) => {
    const elem = document.createElement(tag)
    elem.id = id
    return elem
}

const helperCreate2 = (tag = "h2", title = "test", text = "test") => {
    const elem = document.createElement(tag);
    elem.className = title;
    elem.textContent = text;
    return elem
}

const helperCre = (tag, clas = null, text = null, link = null, src = null) => {
    const elem = document.createElement(tag)

    if (clas) {
        elem.className = clas
    }

    if (text) {
        elem.innerText = text;
    }

    if (link) {
        elem.href = link;
    }

    if (src) {
        elem.src = src;
        elem.alt = `${clas}-${src}`
    }
    
    return elem
}

const addToFav = (elem, info) => {
    let favs = JSON.parse(localStorage.getItem('Favourites')),
        user = JSON.parse(localStorage.getItem('CurUser')),
        base = user ? user.favourites : favs,
        list = base ? base : [];

    if (elem.classList.contains('followed')) {
        elem.classList.remove('followed')
        list.forEach((el, i) => {
            if (el.name == info.name) list.splice(i, 1)
        })
    } else {
        elem.classList.add('followed')
        list.push(info)
    }
    
    if (user) {
        user.favourites = list
        let users = JSON.parse(localStorage.getItem('Users'))
        users[user.id] = user
        localStorage.setItem('Users', JSON.stringify(users))  
        localStorage.setItem('CurUser', JSON.stringify(user))  
    } else {
        localStorage.setItem('Favourites', JSON.stringify(list))
    }
}

export { helperCre, helperCreate, helperCreate2, addToFav };
