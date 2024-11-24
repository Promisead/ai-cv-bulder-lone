import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import { Document, Packer, Paragraph } from "docx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import Modal from '../components/Modal/Modal';
import Loader from "../components/loader";
import { deleteCv } from "../store/action/userAppStorage";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from 'react-share';

const Preview4 = () => {
  const { cv: formData, isCvAvailable } = useSelector((state) => state.userAuth);
  const cvRef = useRef();
  const navigate = useNavigate();
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
            new Paragraph({ text: formData?.jobTitle || "Job Title", heading: "Heading2" }),
            new Paragraph(formData?.phone || "Phone"),
            new Paragraph(formData?.email || "Email"),
            new Paragraph(formData?.address || "Address"),
            new Paragraph("ABOUT ME"),
            new Paragraph(formData?.aboutMe || "Description not provided"),

            new Paragraph("EXPERIENCE"),
            ...(formData?.experiences || []).map(
              (exp) =>
                new Paragraph(
                  `${exp.title || "Job Title"} - ${exp.company || "Company"} | ${exp.dateRange || "Date Range"}`
                )
            ),

            new Paragraph("EDUCATION"),
            ...(formData?.education || []).map(
              (edu) =>
                new Paragraph(
                  `${edu.degree || "Degree"} - ${edu.institution || "Institution"} | ${edu.dateRange || "Date Range"}`
                )
            ),

            new Paragraph("SKILLS"),
            new Paragraph(formData?.skills3 ? formData.skills3.join(", ") : "Skills not provided"),

            new Paragraph("LANGUAGES"),
            ...(formData?.languages || []).map(
              (lang) => new Paragraph(`${lang.language} - ${lang.proficiency}`)
            ),
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

  if (!isCvAvailable) {
    return <div>No CV available</div>;
  }

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
      {isLoading && <Loader />}
      {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}
      <div
        ref={cvRef}
        style={{
          fontFamily: "Georgia, serif",
          maxWidth: "800px",
          margin: "auto",
          padding: "40px",
          backgroundColor: "#fff",
          color: "#333",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <header style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{ fontSize: "36px", margin: "0" }}>{formData?.name || "Name Not Provided"}</h1>
          <p style={{ fontSize: "20px", fontStyle: "italic", margin: "0" }}>
            {formData?.jobTitle || "Job Title Not Provided"}
          </p>
          <div style={{ fontSize: "16px", marginTop: "10px" }}>
            <p>{formData?.address || "Address Not Provided"}</p>
            <p>Tel: {formData?.phone || "Phone Not Provided"} | {formData?.email || "Email Not Provided"}</p>
          </div>
        </header>

        {/* Additional Sections */}
        {/* Sections like About Me, Experience, Education, Skills, Languages, etc., go here */}

        <section style={{ marginBottom: "20px" }}>
          <h2 style={sectionHeaderStyle}>Experience</h2>
          {formData?.experiences?.map((exp, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <h3 style={jobTitleStyle}>{exp?.title || "Job Title Not Provided"}</h3>
              <p style={{ fontWeight: "bold", margin: "5px 0" }}>
                {exp?.company || "Company Not Provided"} | {exp?.location || "Location Not Provided"} | {exp?.dateRange || "Date Range Not Provided"}
              </p>
              <ul style={responsibilitiesListStyle}>
                {exp?.responsibilities?.map((responsibility, i) => (
                  <li key={i}>{responsibility}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section style={{ marginBottom: "20px" }}>
          <h2 style={sectionHeaderStyle}>Education</h2>
          {formData?.education?.map((edu, index) => (
            <div key={index}>
              <p style={{ fontWeight: "bold", fontSize: "18px", margin: "5px 0" }}>{edu?.degree || "Degree Not Provided"}</p>
              <p>{edu?.institution || "Institution Not Provided"} | {edu?.dateRange || "Date Range Not Provided"}</p>
            </div>
          ))}
        </section>

        <section style={{ marginBottom: "20px" }}>
          <h2 style={sectionHeaderStyle}>Skills</h2>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {formData?.skills3?.map((skill, index) => (
              <span key={index} style={skillTagStyle}>{skill}</span>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: "20px" }}>
          <h2 style={sectionHeaderStyle}>Languages</h2>
          <ul style={responsibilitiesListStyle}>
            {formData?.languages?.map((lang, index) => (
              <li key={index}>{lang.language} - {lang.proficiency}</li>
            ))}
          </ul>
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

const sectionHeaderStyle = {
  fontSize: "22px",
  fontWeight: "bold",
  color: "#000",
  borderBottom: "1px solid #000",
  paddingBottom: "5px",
  marginBottom: "15px",
};

const jobTitleStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#333",
};

const responsibilitiesListStyle = {
  paddingLeft: "20px",
  margin: "5px 0",
};

const skillTagStyle = {
  backgroundColor: "#f1f1f1",
  padding: "5px 10px",
  margin: "5px",
  borderRadius: "5px",
  fontSize: "14px",
  color: "#333",
};

const buttonStyle = {
  padding: "10px 20px",
  margin: "10px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

export default Preview4;