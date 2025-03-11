import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCertificate } from "../redux/certificatesSlice";
import { useNavigate } from "react-router-dom";

export default function CertificateForm() {
  const [name, setName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  
  const [errors, setErrors] = useState({ name: "", issuer: "", file: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

    const fileUrl = URL.createObjectURL(file!); // Temporary URL

    dispatch(
      addCertificate({
        id: crypto.randomUUID(),
        name,
        issuer,
        fileName,
        fileUrl,
      })
    );

    navigate("/certificates"); // Go to saved certificates page
  };

  return (
    <div className="container mt-5">
      <div className="text-center" >
      <h2 >Skills-Based Certifications</h2>
      <p>(You can add upto 5 certifications)</p>
      </div>

      {/* Certificate Name */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Certificate Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((prev) => ({ ...prev, name: "" })); // Clear error when typing
          }}
        />
        {errors.name && <p className="text-danger">{errors.name}</p>}
      </div>

      {/* Issuer */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Issuer"
          value={issuer}
          onChange={(e) => {
            setIssuer(e.target.value);
            setErrors((prev) => ({ ...prev, issuer: "" }));
          }}
        />
        {errors.issuer && <p className="text-danger">{errors.issuer}</p>}
      </div>

      {/* File Upload */}
      <div className="mb-3">
        <div className="input-group">
          <input type="text" className="form-control" placeholder="No file chosen" value={fileName} readOnly />
          <input type="file" accept=".pdf, .jpg" id="fileUpload" className="d-none" onChange={handleFileUpload} />
          <label htmlFor="fileUpload" className="btn btn-outline-primary">Upload</label>
        </div>
        {errors.file && <p className="text-danger">{errors.file}</p>}
      </div>

      {/* Save Certificate Button */}
      <button className="btn btn-success" onClick={handleSubmit}>Save Certificate</button>
    </div>
  );
}
