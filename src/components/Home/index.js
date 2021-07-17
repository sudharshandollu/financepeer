import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, withRouter} from 'react-router-dom'

import Header from '../Header'
import './index.css'

class Home extends Component {
  handleChangeFile = file => {
    const fileData = new FileReader()
    fileData.onloadend = async function (e) {
      const content = e.target.result
      try {
        let data = JSON.parse(content)
        data = JSON.stringify(data)

        const username = Cookies.get('username')
        const userData = {username, data}

        const api = 'http://localhost:5000/posts'
        const options = {
          headers: {'Content-Type': 'application/json'},
          method: 'POST',
          body: JSON.stringify(userData),
        }
        await fetch(api, options)
      } catch (error) {
        alert('Invalid Input File')

        // console.log(error)
      }

      // Use reader.result
      //    alert(reader.result)
    }
    fileData.readAsText(file)
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="home-container">
          <div>
            <h1>Select File</h1>
            <input
              type="file"
              accept=".json"
              onChange={e => this.handleChangeFile(e.target.files[0])}
            />
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Home)
