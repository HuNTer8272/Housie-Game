import React, { useState } from 'react';

interface CouponPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCoupon: () => void;
}

const CouponPopup: React.FC<CouponPopupProps> = ({ isOpen, onClose, onApplyCoupon }) => {
  const [couponCode, setCouponCode] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = () => {
    // Call your API to apply the coupon code
    // For simplicity, we'll just show a success message here
    setSuccessMessage('Coupon applied successfully!');
    // You can reset the coupon code and perform other actions as needed
    setCouponCode('');
    // Close the popup after applying the coupon
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-10 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Enter Coupon Code</h3>
                <div className="mt-2">
                  <input
                    type="text"
                    className="w-full border-gray-300 rounded-md shadow-sm text-black"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleSubmit}
            >
              Apply Coupon
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
          {successMessage && (
            <div className="bg-green-100 px-4 py-3 sm:px-6">
              <p className="text-sm text-green-700">{successMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponPopup;
