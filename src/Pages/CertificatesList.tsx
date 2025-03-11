import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

export default function CertificatesList() {
  const certificates = useSelector((state: RootState) => state.certificates.certificates);
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="text-center" >
      <h2 >Skills-Based Certifications</h2>
      <p>(You can add upto 5 certifications)</p>
      </div>

      <button className="btn  mb-3 text-primary" onClick={() => navigate("/")}>
       ⬅️ Add Another Certificate
      </button>
      <div className="listDiv">
      {certificates.length === 0 ? (
        <p>No certificates saved.</p>
      ) : (
        <ul className="list-group">
          {certificates.slice(0, 5).map((cert, index) => (
            <li key={cert.id} className="list-group-item d-flex justify-content-between align-items-center listColor">
              <div>
                <div className=" d-flex gap-3">
                <div className="serial ">{index + 1}</div>
                <div>
                  <div className="d-flex align-items-center gap-3">
                  <span className="fw-medium fs18">{cert.name}</span>
                  <span>{cert.issuer}</span>
                  </div>
                  <a
                  href={cert.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn certificateLink p-0"

                >
                  View Certification
                </a>
                </div>
                
                </div>
                
              </div>
            </li>
          ))}
        </ul>
      )}
      </div>
      

      {certificates.length >= 5 && <p className="text-danger mt-2">Maximum of 5 certificates can be added.</p>}
    </div>
  );
}
