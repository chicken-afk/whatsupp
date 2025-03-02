import React from 'react';

class ModalAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: true
        };
    }

    handleClose = () => {
        this.setState({ showModal: false });
        // Add any additional logic for relogin here
    };

    render() {
        return (
            <>
                {this.state.showModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        {/* Modal Content */}
                        <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 relative">
                            {/* Modal Header */}
                            <div className="flex justify-between items-center border-b pb-3">
                                <h3 className="text-lg font-semibold">Session Expired</h3>
                                <button onClick={this.handleClose} className="text-gray-500 hover:text-gray-700">
                                    &times;
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="mt-4">
                                <p>Your login token has expired. Please relogin to continue.</p>
                            </div>

                            {/* /* Modal Footer */} */}
                            <div className="mt-6 flex justify-end">
                                <a href="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                    Relogin
                                </a>
                            </div>
                        </div>

                        {/* Background Overlay */}
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                    </div>
                )}
            </>
        );
    }
}

export default ModalAuth;
