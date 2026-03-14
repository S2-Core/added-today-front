"use client";

import Script from "next/script";

const PagBankSdkProvider = () => (
  <Script
    id="pagbank-sdk"
    src="https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js"
    strategy="afterInteractive"
  />
);

export default PagBankSdkProvider;
