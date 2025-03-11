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
  },
});

export const { addCertificate } = certificatesSlice.actions;
export default certificatesSlice.reducer;
