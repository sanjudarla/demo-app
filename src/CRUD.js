import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import './Styles.css'
import Col from 'react-bootstrap/Col';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'




const CRUD = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [Doctor_Id, setDoctor_id] = useState('')
    const [Doctor_Name, setDoctor_Name] = useState('')
    const [Contact_No, setContact_No] = useState('')
    const [Speciliazation, setSpeciliazation] = useState('')
    const [Charges, setCharges] = useState('')

    const [EditDoctor_Id, setEditDoctor_id] = useState('')
    const [EditDoctor_Name, setEditDoctor_Name] = useState('')
    const [EditContact_No, setEditContact_No] = useState('')
    const [EditSpeciliazation, setEditSpeciliazation] = useState('')
    const [EditCharges, setEditCharges] = useState('')




    const [data, setData] = useState([])

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get('https://localhost:44358/api/Doctor/')
            .then((result) => {
                setData(result.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }

    const handleEdit = (id) => {

        handleShow();
        axios.get(`https://localhost:44358/api/Doctor/${id}`)
            .then((result) => {
                setEditDoctor_id(result.data.Doctor_Id);
                setEditDoctor_Name(result.data.Doctor_Name);
                setEditContact_No(result.data.Contact_No);
                setEditSpeciliazation(result.data.Speciliazation);
                setEditCharges(result.data.Charges)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure want to delete this record") === true) {
            axios.delete(`https://localhost:44358/api/Doctor/${id}`)
                .then((result) => {
                    clear();
                    toast.success('Doctor has been Deleted');
                    getData();
                }).catch((error) => {
                    toast.error(error);
                })

        }
        alert(id);
    }
    const handleUpdate = () => {
        const url = `https://localhost:44358/api/Doctor/${EditDoctor_Id}`;
        const data = {
            "Doctor_Id": EditDoctor_Id,
            "Doctor_Name": EditDoctor_Name,
            "Contact_No": EditContact_No,
            "Speciliazation": EditSpeciliazation,
            "Charges": EditCharges
        }

        axios.put(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success('Doctor has been Updated');
            }).catch((error) => {
                toast.error(error)
            })

    }
    const handleSave = () => {
        const url = 'https://localhost:44358/api/Doctor/';
        const data = {
            "Doctor_Id": Doctor_Id,
            "Doctor_Name": Doctor_Name,
            "Contact_No": Contact_No,
            "Speciliazation": Speciliazation,
            "Charges": Charges
        }

        axios.post(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success('Doctor has been added');
            }).catch((error) => {
                toast.error(error)
            })
    }

    const clear = () => {
        setDoctor_id('');
        setDoctor_Name('');
        setContact_No('');
        setSpeciliazation('');
        setCharges('');
        setEditDoctor_id('');
        setEditDoctor_Name('');
        setEditContact_No('');
        setEditSpeciliazation('');
        setEditCharges('');
    }



    return (
        <div>
            <Fragment>
                <ToastContainer />
                <Container>
                    <Col>
                        <div className="container">
                            <Col><input type="text" className=" form-control" placeholder="Enter Doctor_ id" value={Doctor_Id} onChange={(e) => setDoctor_id(e.target.value)} /></Col>
                            <Col><input type="text" className=" form-control" placeholder="Enter Doctor_Name" value={Doctor_Name} onChange={(e) => setDoctor_Name(e.target.value)} /></Col>
                            <Col><input type="text" className=" form-control" placeholder="Enter Contact_No" value={Contact_No} onChange={(e) => setContact_No(e.target.value)} /></Col>
                            <Col><input type="text" className=" form-control" placeholder="Enter Speciliazation" value={Speciliazation} onChange={(e) => setSpeciliazation(e.target.value)} /></Col>
                            <Col><input type="text" className=" form-control" placeholder="Enter Charges" value={Charges} onChange={(e) => setCharges(e.target.value)} /></Col>
                        </div>
                        <Col><button className="btn btn-primary" onClick={() => handleSave()}>Add Doctor</button></Col>

                    </Col>

                </Container>
                <br></br>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Doctor_Id</th>
                            <th>Doctor_Name</th>
                            <th>Contact_No</th>
                            <th>Speciliazation</th>
                            <th>Charges per day</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.length > 0 ?
                                data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.Doctor_Id}</td>
                                            <td>{item.Doctor_Name}</td>
                                            <td>{item.Contact_No}</td>
                                            <td>{item.Speciliazation}</td>
                                            <td>{item.Charges}</td>
                                            <td colSpan={2}>
                                                <button className="btn btn-primary" onClick={() => handleEdit(item.Doctor_Id)} >Edit</button> &nbsp;
                                                <button className="btn btn-danger" onClick={() => handleDelete(item.Doctor_Id)}>Delete</button>
                                            </td>
                                        </tr>

                                    )
                                })
                                :
                                'Loading..'
                        }


                    </tbody>
                </Table>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modify / Update Doctor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Col>
                            <Col><input type="text" className=" form-control" placeholder="Enter Doctor_ id" value={EditDoctor_Id} onChange={(e) => setEditDoctor_id(e.target.value)} /></Col>
                            <Col><input type="text" className=" form-control" placeholder="Enter Doctor_Name" value={EditDoctor_Name} onChange={(e) => setEditDoctor_Name(e.target.value)} /></Col>
                            <Col><input type="text" className=" form-control" placeholder="Enter Contact_No" value={EditContact_No} onChange={(e) => setEditContact_No(e.target.value)} /></Col>
                            <Col><input type="text" className=" form-control" placeholder="Enter Speciliazation" value={EditSpeciliazation} onChange={(e) => setEditSpeciliazation(e.target.value)} /></Col>
                            <Col><input type="text" className=" form-control" placeholder="Enter Charges" value={EditCharges} onChange={(e) => setEditCharges(e.target.value)} /></Col>

                        </Col>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleUpdate}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        </div>
    )




}
export default CRUD;