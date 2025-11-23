const ConfirmModal = ({ isOpen, onClose, onConfirm, candidate, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8 animate-scaleIn">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
            Xác nhận bầu chọn
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Bạn có chắc chắn muốn bỏ phiếu?
          </p>
        </div>

        {candidate && (
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 mb-6">
            {candidate.image && (
              <img src={candidate.image} alt={candidate.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white dark:border-gray-700" />
            )}
            <h4 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
              {candidate.name}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-1">
              SBD: {candidate.id}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              {candidate.major}
            </p>
          </div>
        )}

        <div className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-bold text-orange-700 dark:text-orange-400 mb-1">Lưu ý quan trọng</p>
              <p className="text-xs text-orange-600 dark:text-orange-500">
                Bạn chỉ có thể bỏ phiếu 1 lần duy nhất và không thể thay đổi sau khi xác nhận!
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 disabled:opacity-50"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang xử lý...
              </span>
            ) : (
              'Xác nhận bỏ phiếu'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
