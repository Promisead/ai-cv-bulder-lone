
import './preview2.css';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import html2pdf from "html2pdf.js";
import { Document, Packer, Paragraph } from "docx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Modal from '../components/Modal/Modal';
import Loader from "../components/loader";
import { deleteCv, fetchSpecificCv } from "../store/action/userAppStorage";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from 'react-share';

const Preview3 = () => {
  const { cv: formData, isCvAvailable } = useSelector((state) => state.userAuth);
  const cvRef = useRef();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isErrorInfo, setIsErrorInfo] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [dummyData, setDummyData] = useState({})
  const dispatch = useDispatch();

  const { id, cv: cvId } = useParams();

  const handleFetchHandler = useCallback(
    async (cvId) => {
      setIsLoading(true);

      // Dispatch action or handle form submission
      let response = await dispatch(fetchSpecificCv(cvId));
      if (!response.bool) {
        setIsLoading(false);
        setIsError(true);
        setIsErrorInfo(response.message);
        return;
      }
      setDummyData(response.message);
      setIsLoading(false);
    },
    [dispatch] // Dependencies to avoid unnecessary re-creation
  );


  useEffect(() => {
    if (!cvId) {
      setDummyData(formData)

      if (!isCvAvailable) {
        return navigate('/template');
      }
      setIsLoading(false)
      return;
    }
    if (!isCvAvailable) {
      handleFetchHandler(cvId);
    }
    // If both `isCvAvailable` and `cvId` are true, do nothing (implicitly handled).
  }, [isCvAvailable, cvId, handleFetchHandler]);


  const shareUrl = window.location.origin + `/preview/${id}` + `/${cvId ? cvId : formData._id}`;







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
            new Paragraph({ text: dummyData?.name || "Full Name", heading: "Title" }),
            new Paragraph({ text: dummyData?.profile || "Profile Title", heading: "Heading2" }),
            new Paragraph(dummyData?.phone || "Phone"),
            new Paragraph(dummyData?.email || "Email"),
            new Paragraph(dummyData?.linkedin || "LinkedIn"),
            new Paragraph(dummyData?.location || "Location"),
            new Paragraph("PROFILE"),
            new Paragraph(dummyData?.profile || "Profile Description"),

            new Paragraph("PROFESSIONAL EXPERIENCE"),
            ...(dummyData?.experiences || []).map(
              (job) =>
                new Paragraph(
                  `${job.role} - ${job.company} | ${job.startDate} - ${job.endDate} | ${job.location}`
                )
            ),

            new Paragraph("EDUCATION"),
            ...(dummyData?.education || []).map(
              (edu) =>
                new Paragraph(
                  `${edu.degree} - ${edu.institution} | ${edu.startDate} - ${edu.endDate}`
                )
            ),

            new Paragraph("CERTIFICATION"),
            ...(dummyData?.certifications || []).map(
              (cert) => new Paragraph(`${cert.title} | ${cert.organization}`)
            ),

            new Paragraph("TECHNICAL SKILLS"),
            new Paragraph(dummyData?.skills3 ? dummyData.skills3.join(", ") : ""),

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
    navigate(`/editcv/${dummyData.cvTemplateType}`);
  };

  if (!isCvAvailable) {
    return <div>No CV available</div>;
  }

  //deleteCv
  const deleteHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await dispatch(deleteCv(dummyData));
    if (!response.bool) {
      setIsLoading(false);
      setIsError(true);
      setIsErrorInfo(response.message);
    } else {
      setIsLoading(false);
      navigate(`/cvs`);
    }
  };

  if (isLoading) {
    return <Loader />
  }


  if (isError) {
    return <Modal content={isErrorInfo} closeModal={() => setIsError(false)} />
  }

  


  return (
    <div className="w-full flex justify-center items-center h-screen px-40 p-100 " style={{ width: '100vw',paddingTop:'500px' }}>
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
          <h1 className="text-2xl font-bold">{dummyData?.name || "Full Name"}</h1>
          <p className="text-lg text-gray-500">{dummyData?.profile || "Profile Title"}</p>
          <div className="text-base mt-2">
            <p>
              <span>📞 {dummyData?.phone || "+1-000-000"} </span> |
              <span> ✉️ {dummyData?.email || "email@example.com"} </span> |
              <span>
                🔗 <a href={dummyData?.linkedin || "#"} className="text-blue-500 underline">{dummyData?.linkedin || "linkedin.com"}</a>
              </span>
            </p>
            <p>📍 {dummyData?.location || "New York City, NY"}</p>
          </div>
        </header>

        <section>
          <h2 className="border-b pb-2 text-lg font-semibold">PROFILE</h2>
          <p>{dummyData?.profile || "Result-oriented project team leader with experience covering project and product management."}</p>
        </section>

        <section>
          <h2 className="border-b pb-2 text-lg font-semibold">PROFESSIONAL EXPERIENCE</h2>
          {(dummyData?.experiences || []).map((job, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-bold">{job.role}</h3>
              <p>
                <strong>{job.company}</strong> | {job.startDate} - {job.endDate} | {job.location}
              </p>
              <ul className="list-disc list-inside">
                {job.responsibilities.map((responsibility, resIndex) => (
                  <li key={resIndex}>{responsibility}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2 className="border-b pb-2 text-lg font-semibold">EDUCATION</h2>
          {(dummyData?.education || []).map((edu, index) => (
            <div key={index}>
              <p><strong>{edu.degree || "Degree"}</strong></p>
              <p>{edu.institution || "Institution"}</p>
              <p>{edu.startDate || "Start Date"} - {edu.endDate || "End Date"}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="border-b pb-2 text-lg font-semibold">CERTIFICATION</h2>
          {(dummyData?.certifications || []).map((cert, index) => (
            <p key={index}>{cert.title || "Certification"} | {cert.organization || "Organization"}</p>
          ))}
        </section>

        <section>
          <h2 className="border-b pb-2 text-lg font-semibold">TECHNICAL SKILLS</h2>
          <p>
            {dummyData?.skills3
              ? dummyData.skills3.split(",").join(", ")
              : "Technical Skills"}
          </p>
        </section>

        {isCvAvailable ? (
          <>
            <div className="flex flex-col sm:flex-row justify-between mt-4 space-y-2 sm:space-y-0">
              <button
                onClick={downloadPDF}
                className="bg-blue-500 text-white px-4 py-2 rounded shadow-sm hover:bg-blue-600"
              >
                Download PDF
              </button>
              <button
                onClick={downloadDOCX}
                className="bg-blue-500 text-white px-4 py-2 rounded shadow-sm hover:bg-blue-600"
              >
                Download DOCX
              </button>
              <button
                onClick={editHandler}
                className="bg-blue-500 text-white px-4 py-2 rounded shadow-sm hover:bg-blue-600"
              >
                Edit CV
              </button>
              <button
                onClick={deleteHandler}
                className="bg-blue-500 text-white px-4 py-2 rounded shadow-sm hover:bg-blue-600"
              >
                Delete CV
              </button>
            </div>

            <div className="text-center mt-3">
              <h3 className="text-lg font-semibold">Share your CV</h3>
              <div className="flex justify-center space-x-2">
                <FacebookShareButton url={shareUrl} quote="Check out my CV!" className="hover:opacity-80">
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl} title="Check out my CV!" className="hover:opacity-80">
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <LinkedinShareButton url={shareUrl} className="hover:opacity-80">
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <WhatsappShareButton url={shareUrl} title="Check out my CV!" className="hover:opacity-80">
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>

  );
};

export default Preview3;







