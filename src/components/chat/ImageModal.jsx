import { IoMdClose } from "react-icons/io";

const ImageModal = ({ selectedImageModal, setSelectedImageModal }) => {
  if (!selectedImageModal) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={() => setSelectedImageModal(null)}
    >
      <div className="relative max-w-4xl max-h-[80vh]">
        <img 
          src={selectedImageModal}
          alt="Full size"
          className="rounded-lg shadow-2xl"
        />
        <button 
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300"
          onClick={() => setSelectedImageModal(null)}
        >
          <IoMdClose className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ImageModal;