import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, Button } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css'; // Ensure you have the correct styling
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal/Modal'; // Ensure correct import path
import Loader from "../components/loader"; // Ensure correct import path
import { useDispatch, useSelector } from 'react-redux'; 
import { logout } from '../store/action/userAppStorage';



const PricingPlan = () => {
    const [activeTab, setActiveTab] = useState('pricing');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loader state
    const [isError, setIsError] = useState(false); // Error state
    const [isErrorInfo, setIsErrorInfo] = useState(''); // Error message state
    const navigate = useNavigate();
    const { user } = useSelector(state => state.userAuth); // Fetch user from Redux store
    let dispatch = useDispatch()

    useEffect(() => {
        if (!user) {
            navigate('/login'); // Redirect to login page if user is not found
        }
    }, [user, navigate]);

    const handleLogout = async () => {
        await dispatch( logout())
        navigate('/login')
      };
    


    const handleTabChange = (tab, path) => {
        setActiveTab(tab);
        navigate(path);
    };

    const dashboardUrl = process.env.REACT_APP_DASHBOARD_URL;

    const renderContent = () => (
        <main className="bg-light p-4 rounded">
            <h2 className="mb-5 text-center  text-primary font-weight-bold">Choose Your Plan</h2>
            <Row>
                {[
                    { title: 'Basic', price: '$10/month', description: 'Perfect for individuals starting out.', btnColor: 'outline-primary' },
                    { title: 'Standard', price: '$20/month', description: 'Ideal for small teams with extra features.', btnColor: 'outline-success' },
                    { title: 'Premium', price: '$30/month', description: 'Best for larger organizations.', btnColor: 'outline-warning' },
                ].map((plan, index) => (
                    <Col md={4} className="mb-4" key={index}>
                        <div className="card pricing-card shadow-sm">
                            <div className="card-body text-center">
                                <h5 className="card-title font-weight-bold text-dark mb-3">{plan.title}</h5>
                                <h6 className="card-subtitle text-muted mb-3 font-weight-bold">{plan.price}</h6>
                                <p className="card-text mb-4 text-secondary">{plan.description}</p>
                                <Button variant={plan.btnColor} className="px-4 py-2 rounded-pill">Choose Plan</Button>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </main>
    );

    return (
        <>
            {isLoading && <Loader />} {/* Loader Component */}
            {isError && <Modal content={isErrorInfo} closeModal={() => setIsError(false)} />} {/* Modal for Error */}
            <div className="dashboard-container bg-gradient">
                <div className={`sidebar ${sidebarOpen ? 'visible' : ''} shadow`}>
                    <div className="sidebar-header d-flex justify-content-between align-items-center p-3  text-white">
                        <h4 className="text-center w-100">Dashboard</h4>
                        <Button variant="outline-light" className="d-md-none" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</Button>
                    </div>
                    <Nav className="flex-column text-light">
                        <Nav.Link
                            onClick={() => window.location.href = dashboardUrl}
                            className={`sidebar-link ${activeTab === "myCVs" ? "active" : ""}`}
                        >
                            Create with AI
                        </Nav.Link>
                        {[
                            { name: 'My CVs', path: '/cvs' },
                            { name: 'Templates', path: '/template' },
                            { name: 'Profile Settings', path: '/profilesetting' },
                            { name: 'pricing', path: '/pricing' },
                        ].map((item, index) => (
                            <Nav.Link
                                key={index}
                                onClick={() => handleTabChange(item.name.toLowerCase().replace(' ', ''), item.path)}
                                className={`sidebar-link ${activeTab === item.name.toLowerCase().replace(' ', '') ? 'active' : ''}`}
                            >
                                {item.name}
                            </Nav.Link>
                        ))}
                        <Nav.Link onClick={handleLogout} className="sidebar-link">
                            Logout
                        </Nav.Link>
                    </Nav>
                </div>

                <Container fluid className="main-content">
                    <Navbar expand="lg" className="shadow-sm mb-4 p-3 header-navbar bg-primary text-white sticky-top">
                        <Container fluid>
                            <Row className="w-100 align-items-center">
                                <Col xs={6} md={8} className="d-flex justify-content-end align-items-center">
                                    <FaUserCircle size={35} className="me-3 user-icon" />
                                    <Button variant="outline-light" className="ml-auto me-3 logout-btn rounded-pill">
                                        Logout
                                    </Button>
                                </Col>
                                <Button variant="outline-light" className="d-lg-none sidebar-toggle-btn rounded-circle" onClick={() => setSidebarOpen(!sidebarOpen)}>
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

export default PricingPlan;
