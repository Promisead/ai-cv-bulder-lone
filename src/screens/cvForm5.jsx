import React, { useState } from 'react';
import './form.css'; // Assuming you have form-specific styles here
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal/Modal';
import Loader from "../components/loader";
import { makeCv } from '../store/action/userAppStorage'; // Assuming makeCv is the Redux action

const CVForm = () => {
    let navigate = useNavigate();
    let [isError, setIsError] = useState(false);
    let [isErrorInfo, setIsErrorInfo] = useState('');
    let [isLoading, setIsLoading] = useState(false);

    let dispatch = useDispatch();

    // Initialize formData with empty values
    const [formData, setFormData] = useState({
        name: '',
        contact: {
            address: '',
            phone: '',
            email: ''
        },
        profile: '',
        employmentHistory: [
            {
                title: '',
                location: '',
                date: '',
                responsibilities: ['']
            }
        ],
        education: [
            {
                degree: '',
                location: '',
                date: '',
                honors: ''
            }
        ],
        skillset: [
            { skill: '', level: '' }
        ],
        references: [
            { name: '', email: '', phone: '' }
        ],
        cvTemplateType: 'template5'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            contact: { ...prevData.contact, [name]: value }
        }));
    };

    const handleExperienceChange = (index, e) => {
        const { name, value } = e.target;
        const updatedExperience = [...formData.employmentHistory];
        updatedExperience[index][name] = value;
        setFormData({ ...formData, employmentHistory: updatedExperience });
    };

    const handleAddExperience = () => {
        setFormData({
            ...formData,
            employmentHistory: [
                ...formData.employmentHistory,
                {
                    title: '',
                    location: '',
                    date: '',
                    responsibilities: ['']
                }
            ]
        });
    };

    const handleResponsibilityChange = (expIndex, resIndex, value) => {
        const updatedExperiences = [...formData.employmentHistory];
        updatedExperiences[expIndex].responsibilities[resIndex] = value;
        setFormData({ ...formData, employmentHistory: updatedExperiences });
    };

    const handleAddResponsibility = (expIndex) => {
        const updatedExperiences = [...formData.employmentHistory];
        updatedExperiences[expIndex].responsibilities.push('');
        setFormData({ ...formData, employmentHistory: updatedExperiences });
    };

    const handleEducationChange = (index, e) => {
        const { name, value } = e.target;
        const updatedEducation = [...formData.education];
        updatedEducation[index][name] = value;
        setFormData((prevData) => ({
            ...prevData,
            education: updatedEducation
        }));
    };

    const handleSkillChange = (index, e) => {
        const updatedskillset = [...formData.skillset];
        updatedskillset[index].skill = e.target.value;
        setFormData({ ...formData, skillset: updatedskillset });
    };

    const handleAddSkill = () => {
        setFormData({ ...formData, skillset: [...formData.skillset, { skill: '', level: '' }] });
    };

    const handleReferenceChange = (index, name, e) => {
        const { value } = e.target;
        const updatedReferences = [...formData.references];
        updatedReferences[index][name] = value;
        setFormData({ ...formData, references: updatedReferences });
    };

    const handleAddReference = () => {
        setFormData({
            ...formData,
            references: [
                ...formData.references,
                { name: '', email: '', phone: '' }
            ]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Dispatch the form data to the Redux action
        let response = await dispatch(makeCv(formData)); // makeCv is assumed to be a Redux action

        if (!response.bool) {
            setIsLoading(false);
            setIsError(true);
            setIsErrorInfo(response.message);
        } else {
            setIsLoading(false);
            // Navigate to the preview page based on the selected template
            navigate(`/preview/${formData.cvTemplateType}`);
        }
    };

    let closeModal = () => {
        setIsError(false);
    };

    return (
        <>
            {isLoading && <Loader />}
            {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}
            <div className="form-container">
                <div className="cv-form-containers">
                    <form onSubmit={handleSubmit}>
                        <h2>Personal Information</h2>
                        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                        <input type="text" name="address" placeholder="Address" value={formData.contact.address} onChange={handleContactChange} />
                        <input type="tel" name="phone" placeholder="Phone" value={formData.contact.phone} onChange={handleContactChange} />
                        <input type="email" name="email" placeholder="Email" value={formData.contact.email} onChange={handleContactChange} required />
                        <textarea name="profile" placeholder="Profile Description" value={formData.profile} onChange={handleChange} />

                        <h2>Employment History</h2>
                        {formData.employmentHistory.map((exp, index) => (
                            <div key={index}>
                                <input type="text" name="title" placeholder="Job Title" value={exp.title} onChange={(e) => handleExperienceChange(index, e)} />
                                <input type="text" name="location" placeholder="Location" value={exp.location} onChange={(e) => handleExperienceChange(index, e)} />
                                <input type="text" name="date" placeholder="Date Range" value={exp.date} onChange={(e) => handleExperienceChange(index, e)} />
                                {exp.responsibilities.map((res, resIndex) => (
                                    <input key={resIndex} type="text" placeholder="Responsibility" value={res} onChange={(e) => handleResponsibilityChange(index, resIndex, e.target.value)} />
                                ))}
                                <button type="button" onClick={() => handleAddResponsibility(index)}>Add Responsibility</button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddExperience}>Add Experience</button>

                        <h2>Education</h2>
                        {formData.education.map((edu, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    name="degree"
                                    placeholder="Degree"
                                    value={edu.degree}
                                    onChange={(e) => handleEducationChange(index, e)}
                                />
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Institution"
                                    value={edu.location}
                                    onChange={(e) => handleEducationChange(index, e)}
                                />
                                <input
                                    type="text"
                                    name="date"
                                    placeholder="Date Range"
                                    value={edu.date}
                                    onChange={(e) => handleEducationChange(index, e)}
                                />
                                <input
                                    type="text"
                                    name="honors"
                                    placeholder="Honors"
                                    value={edu.honors}
                                    onChange={(e) => handleEducationChange(index, e)}
                                />
                            </div>
                        ))}

                        <h2>skillset</h2>
                        {formData.skillset.map((skill, index) => (
                            <div key={index}>
                                <input type="text" value={skill.skill} onChange={(e) => handleSkillChange(index, e)} placeholder="Skill" />
                            </div>
                        ))}
                        <button type="button" onClick={handleAddSkill}>Add Skill</button>

                        <h2>References</h2>
                        {formData.references.map((ref, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    value={ref.name}
                                    onChange={(e) => handleReferenceChange(index, 'name', e)}
                                    placeholder="Name"
                                />
                                <input
                                    type="email"
                                    value={ref.email}
                                    onChange={(e) => handleReferenceChange(index, 'email', e)}
                                    placeholder="Email"
                                />
                                <input
                                    type="tel"
                                    value={ref.phone}
                                    onChange={(e) => handleReferenceChange(index, 'phone', e)}
                                    placeholder="Phone"
                                />
                            </div>
                        ))}
                        <button type="button" onClick={handleAddReference}>Add Reference</button>

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CVForm;

