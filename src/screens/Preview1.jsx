import React, { useState, useEffect, useRef } from "react";
import './preview.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { Document, Packer, Paragraph } from "docx";
import { deleteCv } from "../store/action/userAppStorage";
import Modal from '../components/Modal/Modal';
import Loader from "../components/loader";
import { useLocation } from 'react-router-dom';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from 'react-share';


const Preview1 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { cv: formData, isCvAvailable } = useSelector(state => state.userAuth);
  const [isError, setIsError] = useState(false);
  const [isErrorInfo, setIsErrorInfo] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cvRef = useRef();

  let location = useLocation()
  // Social media sharing URL (you can customize this based on your needs)
  const shareUrl = window.location.origin + location.pathname;
 
  useEffect(() => {
    if (!isCvAvailable) {
      navigate('/template');
    }
  }, [isCvAvailable, navigate]);

  if (!isCvAvailable) {
    return null;
  }

  const downloadPDF = () => {
    const element = cvRef.current;
    const options = {
      margin: 1,
      filename: 'CV.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().from(element).set(options).save();
  };

  const downloadDOCX = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({ text: formData?.name || "Full Name", heading: "Title" }),
            new Paragraph({ text: formData?.jobTitle || "Job Title", heading: "Heading2" }),
            new Paragraph("SUMMARY"),
            new Paragraph(`Phone: ${formData.phone}`),
            new Paragraph(`Email: ${formData.email}`),
            new Paragraph(`Location: ${formData.location}`),
            new Paragraph(`Social Media: ${formData.socialMedia}`),

            new Paragraph("AWARDS"),
            ...(formData?.awards || []).map(
              (award) =>
                new Paragraph(
                  `${award.title} - ${award.organization} / ${award.year} / ${award.location}`
                )
            ),

            new Paragraph("ACHIEVEMENTS"),
            ...(formData?.achievements || []).map(
              (achievement) =>
                new Paragraph(achievement.description)
            ),

            new Paragraph("EDUCATION"),
            ...(formData?.education || []).map(
              (edu) =>
                new Paragraph(
                  `${edu.degree} - ${edu.institution} / ${edu.year}`
                )
            ),

            new Paragraph("WORK EXPERIENCE"),
            ...(formData?.workExperience || []).map((work) => {
              const responsibilities = work?.responsibilities?.map(
                (responsibility) => new Paragraph(`• ${responsibility}`)
              );
              return [
                new Paragraph(`${work.title} - ${work.company} / ${work.duration}`),
                ...responsibilities,
              ];
            }).flat(),
          ],
        },
      ],
    });

    try {
      const blob = await Packer.toBlob(doc);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "CV.docx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error generating DOCX:", error);
    }
  };

  const editHandler = () => {
    navigate(`/editcv/${formData.cvTemplateType}`);
  };

  const deleteHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await dispatch(deleteCv(formData));
    if (!response.bool) {
      setIsLoading(false);
      setIsError(true);
      setIsErrorInfo(response.message);
    } else {
      setIsLoading(false);
      navigate(`/cvs`);
    }
  };

  const closeModal = () => {
    setIsError(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100vw' }}>
      <div className="container-cvs">
        {isLoading && <Loader />}
        {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}

      

        <div className="cv-containers" ref={cvRef}>
          <div className="left-column">
            <div className="profile-picture">
              {/*<img src="profile.jpg" alt="Profile Picture" />*/}
            </div>
            <h1 className="name">{formData.name}</h1>
            <h2 className="job-title">{formData.jobTitle}</h2>

            <section className="section summary-section">
              <h3>SUMMARY</h3>
              <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                <li><i className="fas fa-phone"></i> {formData.phone}</li>
                <li><i className="fas fa-envelope"></i> {formData.email}</li>
                <li><i className="fas fa-map-marker-alt"></i> {formData.location}</li>
                <li><i className="fas fa-globe"></i> {formData.socialMedia}</li>
              </ul>

            </section>

            <section className="section awards-section">
              <h3>AWARDS</h3>
              {formData.awards.map((award, index) => (
                <p key={index}>
                  <strong>{award.title}</strong><br />
                  {award.organization} / {award.year} / {award.location}
                </p>
              ))}
            </section>

            <section className="section achievements-section">
              <h3>ACHIEVEMENTS</h3>
              {formData.achievements.map((achievement, index) => (
                <p key={index}>{achievement.description}</p>
              ))}
            </section>
          </div>

          <div className="right-column">
            <section className="section summary">
              <h3>SUMMARY</h3>
              <p>{formData.summary}</p>
            </section>

            <section className="section education">
              <h3>EDUCATION</h3>
              {formData.education.map((edu, index) => (
                <div className="education-item" key={index}>
                  <h4>{edu.degree}</h4>
                  <p>{edu.institution} / {edu.year}</p>
                  <p>{edu.details}</p>
                </div>
              ))}
            </section>

            <section className="section work-experience">
              <h3>WORK EXPERIENCE</h3>
              {formData.workExperience.map((work, index) => (
                <div className="work-item" key={index}>
                  <h4>{work.title}</h4>
                  <p>{work.company} / {work.duration}</p>
                  <ul>
                    {work.responsibilities.map((responsibility, i) => (
                      <li key={i}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          </div>
        </div>

        <div className="cv-button-con text-center mt-3">
          <button onClick={downloadPDF} className="btn btn-primary m-2">Download PDF</button>
          <button onClick={downloadDOCX} className="btn btn-primary m-2">Download DOCX</button>
          <button onClick={editHandler} className="btn btn-primary m-2">Edit CV</button>
          <button onClick={deleteHandler} className="btn btn-primary m-2">Delete CV</button>
        </div>



        <div className="social-share-buttons text-center mt-3">
          <h3>Share your CV</h3>
          <div className="share-buttons-container">
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

export default Preview1;
























































