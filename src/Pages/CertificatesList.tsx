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

      <button className="btn btn-outline-secondary mb-3" onClick={() => navigate("/")}>
        Add New Certificate
      </button>

      {certificates.length === 0 ? (
        <p>No certificates saved.</p>
      ) : (
        <ul className="list-group">
          {certificates.slice(0, 5).map((cert) => (
            <li key={cert.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{cert.name}</strong> - {cert.issuer}
              </div>
              <div>
                <a
                  href={cert.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm mx-2"
                >
                  View Certificate
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}

      {certificates.length >= 5 && <p className="text-danger mt-2">Maximum of 5 certificates can be added.</p>}
    </div>
  );
}
