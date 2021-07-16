import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

class Products extends Component {
  state = {
    dataPosts: '',
    isLoading: true,
  }

  componentDidMount() {
    this.getJsonData()
  }

  getJsonData = async () => {
    const username = Cookies.get('username')
    const api = `http://localhost:5000/post/?username=${username}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(api, options)

    const data = await response.json()
    console.log(data)
    const dataPosts = JSON.parse(data.data)

    //  console.log(typeof data.data)
    console.log(dataPosts)
    this.setState({
      dataPosts,
      isLoading: false,
    })
  }

  renderData = () => {
    const {dataPosts} = this.state
    return (
      <div>
        {dataPosts.map(eachItem => (
          <div key={eachItem.id} className="each-post">
            <p>{eachItem.userId}</p>
            <h1>{eachItem.title}</h1>
            <p>{eachItem.body}</p>
          </div>
        ))}
      </div>
    )

    // console.log(data)
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        <div>{isLoading ? <h1>No Posts</h1> : this.renderData()}</div>
      </>
    )
  }
}

export default Products
