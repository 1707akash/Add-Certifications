import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  fileName: string;
  fileUrl: string;
}

interface CertificatesState {
  certificates: Certificate[];
}

const initialState: CertificatesState = {
  certificates: [],
};

const certificatesSlice = createSlice({
  name: "certificates",
  initialState,
  reducers: {
    addCertificate: (state, action: PayloadAction<Certificate>) => {
      state.certificates.push(action.payload);
    },
    replaceFirstCertificate: (state, action: PayloadAction<Certificate>) => {
      if (state.certificates.length > 0) {
        state.certificates.shift(); // Remove the first certificate
        state.certificates.push(action.payload); // Add the new one
      }
    },
  },
});

export const { addCertificate, replaceFirstCertificate } = certificatesSlice.actions;
export default certificatesSlice.reducer;
