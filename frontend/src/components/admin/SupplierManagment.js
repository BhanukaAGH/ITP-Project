import React, { useState, useEffect } from 'react'
import Compo from '../Supplier/Componets/Button'
import ViewProfile from '../Supplier/Componets/ViewProfile'
import EditProfile from '../Supplier/Componets/EditProfile'
import Addform from '../Supplier/SupplyProduct/Addform'
import Deletemessage from '../Supplier/Componets/Deletemsg'
import Testresult from '../Supplier/Componets/Test'
import SupplierTable from '../Supplier/Componets/SupplierTable'
import SearchBar from '../Supplier/Componets/Searchbar'
import ExtraInfo from '../Supplier/Componets/ExtraInfo'

const SupplierManagment = (props) => {
  const [posts, setPost] = useState([])

  const [profile, SetProfile] = useState(false)

  const [profiledata, SetProfiledata] = useState([])

  const [editprofile, SetEditprofile] = useState(false)
  const [deletemsg, setDeletemsg] = useState(false)
  const [deletid, setDeleteid] = useState('')
  const [fetchinfo, setfetchinfo] = useState([])
  const [fetdata, setFetdata] = useState([])

  const searchresults = (vdfavfyavsyfyas) => {
    setFetdata(vdfavfyavsyfyas)
  }

  const dataHandler = (profileinformaation) => {
    //console.log(profileinformaation);
    SetProfiledata(profileinformaation)
    SetProfile(true)
  }

  const displaymsg = (id) => {
    setDeletemsg(true)
    setDeleteid(id)
  }

  const unshowdelete = () => {
    setDeletemsg(false)
  }

  const closeview = () => {
    SetProfile(null)
  }

  const editdataHandler = (profileinformaation) => {
    //console.log(profileinformaation);
    SetProfiledata(profileinformaation)
    SetEditprofile(true)
  }

  const closeedit = () => {
    SetEditprofile(null)
  }

  useEffect(() => {
    fetchsupplierdata()
    fetchsupplierproducts()
  }, [])

  const fetchsupplierdata = () => {
    fetch('/suppliers')
      .then((data) => {
        return data.json()
      })
      .then((post) => {
        //console.log(post);
        const dataset = post.map((result) => {
          return {
            Id: result._id,
            Name: result.name,
            Gmail: result.Email,
            Location: result.Location,
          }
        })
        setPost(dataset)
        //console.log(dataset);
      })
  }

  const fetchsupplierproducts = () => {
    fetch('/allproductinfo')
      .then((data) => {
        return data.json()
      })
      .then((post) => {
        // console.log(post)
        const fetchdata = post.map((result) => {
          return {
            Id: result._id,
            Name: result.name,
            Category: result.Category,
            Quantity: result.Quantity,
            Price: result.Price,
            Date: result.date,
          }
        })

        setfetchinfo(fetchdata)
      })
  }

  return (
    <div>
      {editprofile ? (
        <EditProfile
          closebackroundvuew={closeedit}
          list={profiledata}
          onreload={fetchsupplierdata}
        ></EditProfile>
      ) : null}

      {profile ? (
        <ViewProfile
          closebackroundvuew={closeview}
          list={profiledata}
        ></ViewProfile>
      ) : null}
      <Compo onhhh={fetchsupplierdata}></Compo>
      <SearchBar resuslts={posts} />

      <ExtraInfo alldata={posts} allcost={fetchinfo} />

      {deletemsg ? (
        <Deletemessage
          ondeletemsg={unshowdelete}
          deletedid={deletid}
          reredertable={fetchsupplierdata}
        ></Deletemessage>
      ) : null}

      <SupplierTable
        list={posts}
        onProfile={dataHandler}
        onEdit={editdataHandler}
        ongetdelete={displaymsg}
      ></SupplierTable>
      <hr />
      <h1> Product Information Section </h1>
      <Addform datas={posts} />
      <Testresult
        resultset={fetchinfo}
        datas={posts}
        ondataget={searchresults}
      />
    </div>
  )
}

export default SupplierManagment
