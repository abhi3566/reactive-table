import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from 'react-bootstrap-table2-paginator';
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import { Button, Modal } from "react-bootstrap";

function Datalist() {
  const [userList, setUserList] = useState([]);
  const [modelInfo,setModalInfo] = useState([]);
  const [showModal,setShowModal] = useState(false);

  const [show,setShow] = useState(false);
  const handleClose = ()=>setShow(false);
  const handleShow = ()=>setShow(true);

 
  const columns = [
    {
      dataField: "first_name",
      text: "FIRST NAME",
      sort:true,
      filter:textFilter(),
      events:{
        onClick:(e, column, columnIndex, row, rowIndex) =>{

            console.log(row);
            setModalInfo(row)
            toggleTrueFalse()

        }
      }
    },
    {
      dataField: "last_name",
      text: "LAST NAME",
      sort:true,
      filter:textFilter()
    },
    {
      dataField: "age",
      text: "AGE",
      sort:true,
      filter:textFilter()
    },
    {
      dataField: "email",
      text: "EMAIL",
      sort:true,
      filter:textFilter(),
      formatter: (cell) => <a href={"mailto:"+cell} rel="noopener noreferrer" target="_blank"> {cell} </a>
    },
    {
      dataField: "web",
      text: "WEBSITE",
      sort:true,
      filter:textFilter(),
      formatter: (cell) => <a href={cell} rel="noopener noreferrer" target="_blank"> {cell} </a>
    },
  ];

//   const rowEvents ={
//       onClick:(e,row) =>{
//           console.log(row);
//           setModalInfo(row)
//           toggleTrueFalse()
//       }
//   }


  const toggleTrueFalse = () =>{
      setShowModal(handleShow);
  }


  
  const ModalContent = () =>{
      return(
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>
               {modelInfo.first_name+" "+modelInfo.last_name}
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <h3>Details :</h3>
             <ul>
                 <li>First Name :{" "}{modelInfo.first_name}</li>
                 <li>Last Name :{" "}{modelInfo.last_name}</li>
                 <li>Company Name :{" "}{modelInfo.company_name}</li>
                 <li>City :{" "}{modelInfo.city}</li>
                 <li>State :{" "}{modelInfo.state}</li>
                 <li>ZIP :{" "}{modelInfo.zip}</li>
                 <li>Email:{" "}{modelInfo.email}</li>
                 <li>Website :{" "}{modelInfo.web}</li>
                 <li>Age :{" "}{modelInfo.age}</li>
             </ul>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      )
  }

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 13,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    //alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    }
  });

  useEffect(() => {
    fetch(
      "https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json"
    )
      .then((response) => response.json())
      .then((result) => setUserList(result))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>

    <BootstrapTable
     bootstrap4 
     keyField="id"
     columns={columns}  
     data={userList}
     pagination={pagination}
     filter={filterFactory()}
     //rowEvents={rowEvents}
     hover
      />

     {show ?<ModalContent />:null}

      {/* <table>
        <tr>
          <th>ID</th>
          <th>FIRST NAME</th>
          <th>LAST NAME</th>
          <th>AGE</th>
          <th>EMAIL</th>
          <th>WEBSITE</th>
        </tr>
        {userList && userList.length > 0
          ? userList.map((user) => (
              <tr>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>{user.web}</td>
              </tr>
            ))
          : "Loading"}
      </table> */}
    </div>
  );
}

export default Datalist;
