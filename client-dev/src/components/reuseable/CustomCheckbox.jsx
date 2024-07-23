export const CustomCheckbox = ({ isChecked, onToggle, label }) => (
  <div className="mb-4 flex items-center">
    <div
      className={`w-6 h-6 rounded-full border-2 ${
        isChecked ? "bg-blue-400 border-blue-600" : "bg-white border-gray-300"
      } mr-2 flex items-center justify-center cursor-pointer`}
      onClick={onToggle}
    >
      {isChecked && <div className="w-3 h-3 bg-white rounded-full"></div>}
    </div>
    <label
      className="ml-8 text-sm font-medium text-gray-800 cursor-pointer"
      onClick={onToggle}
    >
      {label}
    </label>
  </div>
);
