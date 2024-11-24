import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import './preview2.css';
import { Document, Packer, Paragraph } from "docx";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from '../components/Modal/Modal';
import Loader from "../components/loader";
import { deleteCv } from "../store/action/userAppStorage";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from 'react-share';


const Preview3 = () => {
  const { cv: formData, isCvAvailable } = useSelector((state) => state.userAuth);
  const cvRef = useRef();
  let navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isErrorInfo, setIsErrorInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  let location = useLocation()
  const shareUrl = window.location.origin + location.pathname;

  const downloadPDF = () => {
    const element = cvRef.current;
    const options = {
      margin: 1,
      filename: "CV.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
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
            new Paragraph({ text: formData?.profile || "Profile Title", heading: "Heading2" }),
            new Paragraph(formData?.phone || "Phone"),
            new Paragraph(formData?.email || "Email"),
            new Paragraph(formData?.linkedin || "LinkedIn"),
            new Paragraph(formData?.location || "Location"),
            new Paragraph("PROFILE"),
            new Paragraph(formData?.profile || "Profile Description"),

            new Paragraph("PROFESSIONAL EXPERIENCE"),
            ...(formData?.experiences || []).map(
              (job) =>
                new Paragraph(
                  `${job.role} - ${job.company} | ${job.startDate} - ${job.endDate} | ${job.location}`
                )
            ),

            new Paragraph("EDUCATION"),
            ...(formData?.education || []).map(
              (edu) =>
                new Paragraph(
                  `${edu.degree} - ${edu.institution} | ${edu.startDate} - ${edu.endDate}`
                )
            ),

            new Paragraph("CERTIFICATION"),
            ...(formData?.certifications || []).map(
              (cert) => new Paragraph(`${cert.title} | ${cert.organization}`)
            ),

            new Paragraph("TECHNICAL SKILLS"),
            new Paragraph(formData?.skills3 ? formData.skills3.join(", ") : ""),

            new Paragraph("Powered by Enhancv"),
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

  if (!isCvAvailable) {
    return <div>No CV available</div>;
  }

  //deleteCv
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

  let closeModal = () => {
    setIsError(false);
  };

  return (
    <div className="container-fluid d-flex justify-content-center" style={{ width: '100vw' }}>
      {isLoading && <Loader />}
      {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}
      <div
        ref={cvRef}
        className="shadow-lg p-4 mb-4 bg-white rounded"
        style={{
          fontFamily: "Arial, sans-serif",
          maxWidth: "800px",
          lineHeight: 1.5,
        }}
      >
        <header className="mb-4">
          <h1 className="fs-2">{formData?.name || "Full Name"}</h1>
          <p className="fs-5 text-muted">{formData?.profile || "Profile Title"}</p>
          <div className="fs-6 mt-2">
            <p>
              <span>📞 {formData?.phone || "+1-000-000"} </span> |
              <span> ✉️ {formData?.email || "email@example.com"} </span> |
              <span>
                🔗 <a href={formData?.linkedin || "#"}>{formData?.linkedin || "linkedin.com"}</a>
              </span>
            </p>
            <p>📍 {formData?.location || "New York City, NY"}</p>
          </div>
        </header>

        <section>
          <h2 className="border-bottom pb-2">PROFILE</h2>
          <p>{formData?.profile || "Result-oriented project team leader with experience covering project and product management."}</p>
        </section>

        <section>
          <h2 className="border-bottom pb-2">PROFESSIONAL EXPERIENCE</h2>
          {(formData?.experiences || []).map((job, index) => (
            <div key={index} className="mb-4">
              <h3>{job.role}</h3>
              <p>
                <strong>{job.company}</strong> | {job.startDate} - {job.endDate} | {job.location}
              </p>
              <ul>
                {job.responsibilities.map((responsibility, resIndex) => (
                  <li key={resIndex}>{responsibility}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2 className="border-bottom pb-2">EDUCATION</h2>
          {(formData?.education || []).map((edu, index) => (
            <div key={index}>
              <p><strong>{edu.degree || "Degree"}</strong></p>
              <p>{edu.institution || "Institution"}</p>
              <p>{edu.startDate || "Start Date"} - {edu.endDate || "End Date"}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="border-bottom pb-2">CERTIFICATION</h2>
          {(formData?.certifications || []).map((cert, index) => (
            <p key={index}>{cert.title || "Certification"} | {cert.organization || "Organization"}</p>
          ))}
        </section>

        <section>
          <h2 className="border-bottom pb-2">TECHNICAL SKILLS</h2>
          <p>{formData?.skills3 ? formData.skills3.join(", ") : "Technical Skills"}</p>
        </section>

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

export default Preview3;







