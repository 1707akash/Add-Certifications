import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { addCertificate, replaceFirstCertificate } from "../redux/certificatesSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import './Certificate.css'
import BtnComponent from "../components/BtnComponent";

export default function CertificateForm() {
  const [name, setName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState({ name: "", issuer: "", file: "" });
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const certificates = useSelector((state: RootState) => state.certificates.certificates);

  const validate = () => {
    let newErrors = { name: "", issuer: "", file: "" };
    if (!name.trim()) newErrors.name = "Certificate Name is required.";
    if (!issuer.trim()) newErrors.issuer = "Issuer is required.";
    if (!file) newErrors.file = "You must upload a file.";
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedFile = event.target.files[0];
      const validFormats = ["application/pdf", "image/jpeg"];
  
      if (!validFormats.includes(uploadedFile.type)) {
        setErrors((prev) => ({ ...prev, file: "Only PDF and JPG files are allowed." }));
        setFile(null);
        setFileName("");
        return;
      }
  
      setFile(uploadedFile);
      setFileName(uploadedFile.name);
      setErrors((prev) => ({ ...prev, file: "" })); // Clear error if valid file
    }
  };

  const handleSubmit = () => {
    if (!validate()) return;

    if (certificates.length >= 5) {
      setShowModal(true); // Show modal when 5 files exist
    } else {
      saveCertificate(); // Save normally if less than 5 files
    }
  };

  const saveCertificate = () => {
    const fileUrl = URL.createObjectURL(file!);

    dispatch(
      addCertificate({
        id: crypto.randomUUID(),
        name,
        issuer,
        fileName,
        fileUrl,
      })
    );

    navigate("/certificates");
  };

  const handleReplaceFirst = () => {
    setShowModal(false);

    if (certificates.length >= 5) {
      const fileUrl = URL.createObjectURL(file!);
      dispatch(
        replaceFirstCertificate({
          id: certificates[0]?.id, // Replace first certificate
          name,
          issuer,
          fileName,
          fileUrl,
        })
      );
    }

    navigate("/certificates");
  };

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h2>Skills-Based Certifications</h2>
        <p className="fs14">(You can add upto 5 certifications)</p>
      </div>

      {/* Form Div  */}
      <div className="formBox p-2 p-md-5 rounded-3 m-auto">
        {/* Issuer and certificate div*/}
        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="fw-medium">Certification Name</label>
            <input
              type="text"
              className="form-control my-1"
              placeholder="Enter Certification Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({ ...prev, name: "" })); // Clear error when typing
              }}
            />
            {errors.name && <p className="text-red fs14 ">{errors.name}</p>}
          </div>

          <div className="mb-3 col-md-6">
            <label className="fw-medium">Issuer</label>
            <input
              type="text"
              className="form-control my-1"
              placeholder="Enter Issuer"
              value={issuer}
              onChange={(e) => {
                setIssuer(e.target.value);
                setErrors((prev) => ({ ...prev, issuer: "" }));
              }}
            />
            {errors.issuer && <p className="text-red fs14">{errors.issuer}</p>}
          </div>
        </div>

        {/* File Upload */}
        <div className="my-3">
          <div className="align-items-center d-flex input-group px-2 rounded-5 uploadBox">
            <input
              type="text"
              className="form-control border-0 "
              placeholder="No file chosen"
              value={fileName}
              readOnly
            />
            <input
              type="file"
              accept=".pdf, .jpg"
              id="fileUpload"
              className="d-none"
              onChange={handleFileUpload}
            />
            <BtnComponent
              text="UPLOAD"
              onClick={() => document.getElementById("fileUpload")?.click()}
              className="btn-outline-primary rounded-5 px-3 border-0"
              height="25px"
              icon={<i className="bi bi-upload"></i>}
            />
          </div>
          {errors.file && <p className="text-red fs14">{errors.file}</p>}
          <p className="text-center mt-2 fs14 text-secondary">
            (File format should only be pdf and jpg)
          </p>
        </div>

        {/* Save Certificate Button */}
        <div className="d-flex justify-content-end mt-2">
          <BtnComponent
            text="SAVE CERTIFICATION"
            onClick={handleSubmit}
            className="btn-success rounded-1 px-4"
            height="35px "
            boxShadow="5px 5px 4px #ccc"
          />
        </div>
        
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>Only 5 files can be added. Do you wish to continue?</p>
            <div className="modal-buttons">
              <BtnComponent text="Yes, Replace First" onClick={handleReplaceFirst} className="btn-danger border-0 rounded-1 px-2 me-3" />
              <BtnComponent text="No, Cancel" onClick={() => setShowModal(false)} className="btn-secondary border-0 rounded-1 px-2" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
