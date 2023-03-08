import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
//import './Styles.css'
import Col from 'react-bootstrap/Col';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Link } from "react-router-dom";
import './sty.css';




const Doctor = () => {

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(false);

    const [Doctor_Id, setDoctor_id] = useState('')
    const [Doctor_Name, setDoctor_Name] = useState('')
    const [Contact_No, setContact_No] = useState('')
    const [Speciliazation, setSpeciliazation] = useState('')
    const [Charges_Per_Day, setCharges] = useState('')

    const [EditDoctor_Id, setEditDoctor_id] = useState('')
    const [EditDoctor_Name, setEditDoctor_Name] = useState('')
    const [EditContact_No, setEditContact_No] = useState('')
    const [EditSpeciliazation, setEditSpeciliazation] = useState('')
    const [EditCharges_Per_Day, setEditCharges] = useState('')

    const [idError, setIdError] = useState('')
    const [nameError, setDoctorNameError] = useState('')
    const [contactError, setContactError] = useState('')
    const [specilizationError, setSpecilizationError] = useState('')
    const [chargesError, setChargesError] = useState('')




    const [data, setData] = useState([])

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get('https://localhost:44360/api/Doctor/')
            .then((result) => {
                setData(result.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }

    const handleEdit = (id) => {

        handleShow();
        axios.get(`https://localhost:44360/api/Doctor/${id}`)
            .then((result) => {
                setEditDoctor_id(result.data.Doctor_Id);
                setEditDoctor_Name(result.data.Doctor_Name);
                setEditContact_No(result.data.Contact_No);
                setEditSpeciliazation(result.data.Speciliazation);
                setEditCharges(result.data.Charges_Per_Day)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure want to delete this record") === true) {
            axios.delete(`https://localhost:44360/api/Doctor/${id}`)
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
        const url = `https://localhost:44360/api/Doctor/${EditDoctor_Id}`;
        const data = {
            "Doctor_Id": EditDoctor_Id,
            "Doctor_Name": EditDoctor_Name,
            "Contact_No": EditContact_No,
            "Speciliazation": EditSpeciliazation,
            "Charges_Per_Day": EditCharges_Per_Day
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
        const url = 'https://localhost:44360/api/Doctor/';
        const data = {
            "Doctor_Id": Doctor_Id,
            "Doctor_Name": Doctor_Name,
            "Contact_No": Contact_No,
            "Speciliazation": Speciliazation,
            "Charges_Per_Day": Charges_Per_Day
        }
        if (Doctor_Id === '') {
            setIdError('ID is required');
        } else if (!/^\d+$/.test(Doctor_Id)) {
            setIdError('ID must be a number');
        } else {
            setIdError('');
        }
        if (Doctor_Name === '') {
            setDoctorNameError('Doctor name   is required');
        }

        else if (!/^[a-zA-Z]+$/.test(Doctor_Name)) {
            setDoctorNameError('Doctor name should contain only alphabets');
        }
        else {
            setDoctorNameError('');
        }


        if (Contact_No === '') {
            setContactError('Contact number cannot be empty ');
        } else if (Contact_No.length !== 10) {
            setContactError('Contact number should have 10 digits');
        } else {
            setContactError('');
        }
        if (!Speciliazation) {
            setSpecilizationError('Specilization cannot be empty')
            return false;
        }
        else {
            setSpecilizationError('');
        }
        if (!Charges_Per_Day) {
            setChargesError('Charges Cannot be empty')
            return false;
        }
        else if (!/^\d+$/.test(Charges_Per_Day)) {
            setChargesError('Charges should contain only numbers');
        } else {
            setChargesError('')
        }




        if ((Doctor_Id !== '') && (/^\d+$/.test(Doctor_Id)) && (Doctor_Name !== '') && (/^[a-zA-Z]+$/.test(Doctor_Name)) && (Contact_No !== '') && (Contact_No.length == 10) && (Speciliazation !== '') && (/^[a-zA-Z]+$/.test(Speciliazation)) && (Charges_Per_Day !== '') && (/^\d+$/.test(Charges_Per_Day))) {



            axios.post(url, data)
                .then((result) => {
                    getData();
                    clear();
                    toast.success('Doctor has been added');
                }).catch((error) => {
                    toast.error(error)
                })
        }
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
        <Fragment>
            <ToastContainer />
            <Container>

                <h1>Doctor Details Management</h1>
                <div className="first">

                    <Col>
                        <Col><input type="text" className=" input" placeholder="Enter Doctor_ id" value={Doctor_Id} onChange={(e) => setDoctor_id(e.target.value)} /><b />{idError && <p>{idError}</p>}</Col>
                        <Col><input type="text" className=" input" placeholder="Enter Doctor_Name" value={Doctor_Name} onChange={(e) => setDoctor_Name(e.target.value)} /><b />{nameError && <p>{nameError}</p>}</Col>
                        <Col><input type="text" className=" input" placeholder="Enter Contact_No" value={Contact_No} onChange={(e) => setContact_No(e.target.value)} /><b />{contactError && <p>{contactError}</p>}</Col>
                        <Col><input type="text" className=" input" placeholder="Enter Speciliazation" value={Speciliazation} onChange={(e) => setSpeciliazation(e.target.value)} /><b />{specilizationError && <p>{specilizationError}</p>}</Col>
                        <Col><input type="text" className=" input" placeholder="Enter Charges per day" value={Charges_Per_Day} onChange={(e) => setCharges(e.target.value)} /><b />{chargesError && <p>{chargesError}</p>}</Col>
                        <Col><button onClick={handleSave}>Add Doctor</button></Col>
                        <br />
                        <br />
                        <Col><Link to={'/dashboard'}><button>Back to Home</button></Link></Col>

                    </Col>


                </div>
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
                        <th>Charges per Day</th>
                        <th>Actions</th>
                    </tr>
                    <td></td>
                    <td><input type='text' className=" form-control" value={EditDoctor_Id} onChange={(e) => setEditDoctor_id(e.target.value)} /></td>
                    <td><input type='text' className=" form-control" value={EditDoctor_Name} onChange={(e) => setEditDoctor_Name(e.target.value)} /></td>
                    <td><input type='text' className=" form-control" value={EditContact_No} onChange={(e) => setEditContact_No(e.target.value)} /></td>
                    <td><input type='text' className=" form-control" value={EditSpeciliazation} onChange={(e) => setEditSpeciliazation(e.target.value)} /></td>
                    <td><input type='text' className=" form-control" value={EditCharges_Per_Day} onChange={(e) => setEditCharges(e.target.value)} /></td>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
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
                                        <td>{item.Charges_Per_Day}</td>
                                        <td colSpan={2}>
                                            <button className="btn btn-primary" onClick={() => handleEdit(item.Doctor_Id)} >Edit</button>
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

           
        </Fragment>
    )




}
export default Doctor;