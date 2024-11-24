import React, { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { Document, Packer, Paragraph } from 'docx';
import { useNavigate, useLocation } from 'react-router-dom';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from 'react-share';
import Modal from '../components/Modal/Modal';
import Loader from '../components/loader';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCv } from "../store/action/userAppStorage";
import './CVPreview.css';


const CVPreview = () => {
    const cvRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isErrorInfo, setIsErrorInfo] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { cv: formData, isCvAvailable } = useSelector((state) => state.userAuth);

    console.log(formData)

    const shareUrl = window.location.origin + location.pathname;

    const downloadPDF = () => {
        const element = cvRef.current;
        if (element) {
            const options = {
                margin: 1,
                filename: 'CV.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter' }
            };
            html2pdf().from(element).set(options).save();
        }
    };

    const downloadDOCX = async () => {
        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph(formData.name || ''),
                        new Paragraph(formData.contact?.address || ''),
                        new Paragraph(formData.contact?.phone || ''),
                        new Paragraph(formData.contact?.email || ''),
                        new Paragraph(formData.profile || '')
                    ]
                }
            ]
        });

        const blob = await Packer.toBlob(doc);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'CV.docx';
        a.click();
    };

    const editHandler = () => {
        navigate(`/editcv/${formData.cvTemplateType}`);
      };

    const deleteHandler = async () => {
        setIsLoading(true);
        const response = await dispatch(deleteCv(formData));
        setIsLoading(false);
        if (!response.bool) {
            setIsError(true);
            setIsErrorInfo(response.message);
        } else {
            navigate('/cvs');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100vw' }}>
    {isLoading && <Loader />}
    {isError && <Modal content={isErrorInfo} closeModal={() => setIsError(false)} />}
    <div className="mt-4">
        <div className="card shadow p-4 mb-5 bg-white text-dark mx-auto" style={{ maxWidth: '800px' }} ref={cvRef}>
            <header className="text-center">
                <h1 className="h3 mb-2 mb-sm-3">
                     {formData.name}
                </h1>
                <div className="row">
                    <div className="col-12 col-md-4">
                        <p><i className="fas fa-map-marker-alt"></i> {formData.contact.address}</p>
                    </div>
                    <div className="col-12 col-md-4">
                        <p><i className="fas fa-phone"></i> {formData.contact.phone}</p>
                    </div>
                    <div className="col-12 col-md-4">
                        <p><i className="fas fa-envelope"></i> {formData.contact.email}</p>
                    </div>
                </div>
            </header>

            <section>
                <h3><i className="fas fa-user-circle"></i> Profile</h3>
                <p>{formData.profile}</p>
            </section>

            <section>
                <h3><i className="fas fa-briefcase"></i> Employment History</h3>
                {formData.employmentHistory.map((job, idx) => (
                    <div key={idx}>
                        <h4>{job.title} — {job.location}</h4>
                        <p>{job.date}</p>
                        <ul>
                            {job.responsibilities.map((task, i) => <li key={i}>{task}</li>)}
                        </ul>
                    </div>
                ))}
            </section>

            <section>
                <h3><i className="fas fa-graduation-cap"></i> Education</h3>
                {formData.education.map((edu, idx) => (
                    <div key={idx}>
                        <h4>{edu.degree} — {edu.location}</h4>
                        <p>{edu.date}</p>
                        <p>{edu.honors}</p>
                    </div>
                ))}
            </section>

            <section>
                <h3><i className="fas fa-cogs"></i> skills</h3>
                <ul>
                    {formData.skillset.map((skill, idx) => (
                        <li key={idx}><strong>{skill.skill}</strong>: {skill.level}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h3><i className="fas fa-users"></i> References</h3>
                {formData.references.map((ref, idx) => (
                    <div key={idx}>
                        <p><strong>{ref.name}</strong></p>
                        <p>{ref.email} | {ref.phone}</p>
                    </div>
                ))}
            </section>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between mt-4">
            <button onClick={downloadPDF} className="btn btn-primary shadow-sm mb-2 mb-sm-0">
                Download PDF
            </button>
            <button onClick={downloadDOCX} className="btn btn-primary shadow-sm mb-2 mb-sm-0">
                Download DOCX
            </button>
            <button onClick={editHandler} className="btn btn-primary shadow-sm mb-2 mb-sm-0">
                Edit CV
            </button>
            <button onClick={deleteHandler} className="btn btn-primary shadow-sm mb-2 mb-sm-0">
                Delete CV
            </button>
        </div>

        <div className="mt-4 social-share-buttons text-center mt-3">
            <h3>Share your CV</h3>
            <div className="share-buttons-container d-flex flex-sm-row justify-content-center">
                <FacebookShareButton url={shareUrl} quote="Check out my CV!" className="share-button">
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl} title="Check out my CV!" className="share-button">
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
                <LinkedinShareButton url={shareUrl} className="share-button">
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <WhatsappShareButton url={shareUrl} title="Check out my CV!" className="share-button">
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
            </div>
        </div>
    </div>
</div>

    );
};

export default CVPreview;











