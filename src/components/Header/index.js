import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const data = ''
    const username = Cookies.get('username')
    const userData = {username, data}

    const api = 'http://localhost:5000/posts'
    const options = {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify(userData),
    }
    fetch(api, options)
    Cookies.remove('username')
    Cookies.remove('jwt_token')

    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <ul className="nav-menu">
          <Link to="/" className="nav-link">
            <li>Upload</li>
          </Link>
          <Link to="/posts" className="nav-link">
            <li>Posts</li>
          </Link>
        </ul>
        <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
