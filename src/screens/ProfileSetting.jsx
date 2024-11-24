import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, Button, Form } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal/Modal';
import Loader from "../components/loader";
import { useDispatch, useSelector } from 'react-redux'; 
import { logout } from '../store/action/userAppStorage';
import { updateUser } from '../store/action/userAppStorage';



const ProfileSettings = () => {
    const [activeTab, setActiveTab] = useState('profileSettings');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Loader state
    const [isError, setIsError] = useState(false); // Error state
    const [isErrorInfo, setIsErrorInfo] = useState('');
    const [isUser, setIsUser] = useState(null);
    let navigate = useNavigate();
    let { user } = useSelector(state => state.userAuth);
    let dispatch = useDispatch()


    // Protect the dashboard - if no user is present, redirect to login
    useEffect(() => {
        if (!user) {
            navigate('/login'); // Redirect to login page if user is not found
        } else {
            setIsUser(user);
            setIsLoading(false)
        }
    }, [user, navigate]);


    const handleLogout = async () => {
        await dispatch( logout())
        navigate('/login')
      };
    



    const handleChange = (e) => {
        const { name, value } = e.target;
        setIsUser({ ...isUser, [name]: value });
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        
        let response = await dispatch(updateUser(isUser))

        if (!response.bool) {
            setIsLoading(false)
            setIsError(true)
            setIsErrorInfo(response.message)
        }
        setIsLoading(false)
        setIsError(true)
        setIsErrorInfo(response.message.message)
        setIsUser(response.message.user)
    }


const dashboardUrl = process.env.REACT_APP_DASHBOARD_URL
  const renderContent = () =>  {
        return (<>
            {isUser && <main className="bg-white p-4">
                <h2 className=" mb-4">Profile Settings</h2>
                <Form onSubmit={handleSubmit}>
                    {/* Existing profile form */}
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formFullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="fullName"
                                value={isUser.fullName}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={isUser.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={isUser.phone}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={isUser.username}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formJobTitle">
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="jobTitle"
                                value={isUser.jobTitle}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formCompany">
                            <Form.Label>Company</Form.Label>
                            <Form.Control
                                type="text"
                                name="company"
                                value={isUser.company}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>



                    {/* Password Section */}
                    <h4 className="mt-4">Change Password</h4>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={isUser.password}
                                onChange={handleChange}
                                placeholder="Enter new password"
                            />
                        </Form.Group>
                    </Row>

                    {/* Payment Information Section */}
                    <h4 className="mt-4">Payment Information</h4>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formCardNumber">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="cardNumber"
                                value={isUser.cardNumber}
                                onChange={handleChange}
                                placeholder="Enter your card number"
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formExpiryDate">
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Control
                                type="text"
                                name="expiryDate"
                                value={isUser.expiryDate}
                                onChange={handleChange}
                                placeholder="MM/YY"
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formCVV">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control
                                type="text"
                                name="cvv"
                                value={isUser.cvv}
                                onChange={handleChange}
                                placeholder="CVV"
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formBillingAddress">
                            <Form.Label>Billing Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="billingAddress"
                                value={isUser.billingAddress}
                                onChange={handleChange}
                                placeholder="Enter your billing address"
                            />
                        </Form.Group>
                    </Row>

                    <Button variant="primary" type="submit" className="w-100">
                        Save Changes
                    </Button>
                </Form>
            </main>}
        </>

        );
    };

    return (
        <>
            {isLoading && <Loader />} {/* Loader Component */}
            {isError && <Modal content={isErrorInfo} closeModal={() => setIsError(false)} />} {/* Modal for Error */}
            <div className="dashboard-container">
                <div className={`sidebar ${sidebarOpen ? 'visible' : ''}`}>
                    <div className="sidebar-header d-flex justify-content-between align-items-center">
                        <h4 className="text-white text-center bg-transparent">Dashboard</h4>
                        <Button
                            variant="outline-light"
                            className="d-md-none sidebar-toggle"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            ☰
                        </Button>
                    </div>

                    <Nav className="flex-column">
            <Nav.Link
              onClick={() => {
                window.location.href = dashboardUrl;
              }}
              className={`text-white ${activeTab === "myCVs" ? "active" : ""}`}
            >
              Create with AI
            </Nav.Link>
                        <Nav.Link
                            onClick={() => {
                                setActiveTab('myCVs');
                                navigate('/cvs');
                            }}
                            className={`text-white ${activeTab === 'myCVs' ? 'active' : ''}`}
                        >
                            My CVs
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => {
                                setActiveTab('templates');
                                navigate('/template');
                            }}
                            className={`text-white ${activeTab === 'templates' ? 'active' : ''}`}
                        >
                            Templates
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => {
                                setActiveTab('profileSettings');
                                navigate('/profilesetting');
                            }}
                            className={`text-white ${activeTab === 'profileSettings' ? 'active' : ''}`}
                        >
                            Profile Settings
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => {
                                setActiveTab('pricing');
                                navigate('/pricing');
                            }}
                            className={`text-white ${activeTab === 'pricing' ? 'active' : ''}`}
                        >
                            Pricing Plans
                        </Nav.Link>
                        <Nav.Link onClick={handleLogout} className="text-white">
                            Logout
                        </Nav.Link>
                    </Nav>
                </div>

                <Container fluid className="main-content">
                    <Navbar expand="lg" className="shadow-lg mb-4 py-3 header-navbar" style={{ backgroundColor: '#007bff' }}>
                        <Container fluid>
                            <Row className="w-100 align-items-center">


                                <Col xs={6} md={8} className="d-flex justify-content-end align-items-center">
                                    <FaUserCircle size={35} className="me-3 user-icon text-white" />
                                    <Button variant="outline-light" className="ml-auto me-3 logout-btn" style={{ borderRadius: '20px', padding: '0.5rem 1.5rem', fontWeight: '500' }} onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </Col>

                                <Button
                                    variant="outline-light"
                                    className="d-lg-none ms-auto me-3 sidebar-toggle-btn"
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    style={{ fontSize: '1.5rem', padding: '0.5rem', borderRadius: '10px' }}
                                >
                                    ☰
                                </Button>
                            </Row>
                        </Container>
                    </Navbar>

                    <div className="content">
                        {renderContent()}
                    </div>
                </Container>
            </div>

        </>

    );
};

export default ProfileSettings;







