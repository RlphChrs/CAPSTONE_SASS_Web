import React from "react";

const PdfViewerModal = ({ selectedPDF, setSelectedPDF, setIsModalOpen }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] h-[90%] rounded-md overflow-hidden relative">
        <button
          onClick={() => {
            setSelectedPDF(null);
            setIsModalOpen(false);
          }}
          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm z-10"
        >
          Close
        </button>
        <iframe
          src={selectedPDF}
          className="w-full h-full"
          title="PDF Viewer"
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
};

export default PdfViewerModal;
