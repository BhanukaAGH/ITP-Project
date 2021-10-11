import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
//
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
//

class Payments extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
    }
  }

  componentDidMount() {
    this.retrevepot()
  }
  retrevepot() {
    axios.get('/posts').then((res) => {
      if (res.data.success) {
        this.setState({
          posts: res.data.existingpost,
        })
        console.log(this.state.posts)
      }
    })
  }
  onDelete = (id) => {
    axios.delete(`/post/delete/${id}`).then((res) => {
      swal({
        title: 'Deleted',
        text: 'Your Item has been Deleted successfully!',
        icon: 'error',
        button: 'Done',
      }).then(function () {
        window.location = '/add'
      })
    })
  }

  filterData(posts, searchKey) {
    const result = posts.filter(
      (posts) =>
        posts.topic.toLowerCase().includes(searchKey) ||
        posts.Name.toLowerCase().includes(searchKey) ||
        posts.Address.toLowerCase().includes(searchKey) ||
        posts.city.toLowerCase().includes(searchKey) ||
        posts.zip.toLowerCase().includes(searchKey) ||
        posts.country.toLowerCase().includes(searchKey)
    )

    this.setState({ posts: result })
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value

    axios.get('/posts').then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingpost, searchKey)
      }
    })
  }
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-lg-9 mt-2 mb-2'>
            <h4>Admin Payment Details</h4>
          </div>
          <div className='col-lg-3 mt-2 mb-2'>
            <input
              className='form-control'
              type='search'
              placeholder='Search'
              name='searchQuery'
              onChange={this.handleSearchArea}
            ></input>
        </div>
          <div className='container text-end'>

            <ReactHTMLTableToExcel

            id='test-table-xls-button'

            className='download-table-xls-button'

            table='paytable-to-xls'

            filename='tablexls'

            sheet='tablexls'

             buttonText='Generate Payment Report'/>

          </div>

        </div>

        <table className='table tabel-hover' style={{ marginTop: '40px' }}  id='paytable-to-xls'>
          <thead>
            <th scope='col'>#</th>
            <th scope='col'>Type</th>
            <th scope='col'>FullName</th>
            <th scope='col'>Address</th>
            <th scope='col'>City</th>
            <th scope='col'>Postal Code</th>
            <th scope='col'>Country</th>
            <th scope='col'>Action</th>
          </thead>
          <tbody>
            {this.state.posts.map((posts, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>
                  <a
                    href={`/post/${posts._id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    {posts.topic}
                  </a>{' '}
                </td>
                <td>{posts.Name}</td>
                <td>{posts.Address}</td>
                <td>{posts.city}</td>
                <td>{posts.zip}</td>
                <td>{posts.country}</td>
                <td>
                  <a className='btn btn-primary' href={`/edit/${posts._id}`}>
                    <i className='fas fa-edit'></i>&nbsp; Edit
                  </a>
                  &nbsp;
                  <a
                    className='btn btn-danger'
                    href='#'
                    onClick={() => this.onDelete(posts._id)}
                  >
                    <i className='far fa-trash-alt'></i>&nbsp; Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Payments
