export const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-opacity-20  flex justify-center ">
      <div>
        {children}
        <button onClick={onClose} className="reusableFormBtn mt-2">
          Schließen
        </button>
      </div>
    </div>
  );
};
