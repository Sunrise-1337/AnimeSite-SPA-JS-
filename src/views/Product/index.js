import {helperCreate2} from "helper/helperCreat";

const Product = () => {
    const wrap = helperCreate2('div', '', '')
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json => {
                json.forEach(elem => {
                    let title = helperCreate2('h3', '', elem.title)
                    wrap.append(title)
                })
            })
    return wrap
}
export default Product;
