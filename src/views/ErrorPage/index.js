import {helperCre} from "helper/helperCreat";
import './style.scss'
const ErrorPage = () => {
    const wrap = helperCre('div', 'error')
    const head1 = helperCre('h1', 'error_h1', '404')
    const head2 = helperCre('h4', 'error_h4', 'error')
    const text = helperCre('p', 'error_p', "Sorry, but this page doesn't exist")
    
    wrap.append(head1)
    wrap.append(head2)
    wrap.append(text)
    return wrap
}
export default ErrorPage;
