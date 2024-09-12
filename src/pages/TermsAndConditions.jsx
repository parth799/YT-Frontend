import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/components/Logo";
import { useState, useEffect } from "react";

const TermsAndConditions = () => {
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    // Check if the user has already accepted terms
    useEffect(() => {
        const hasAccepted = localStorage.getItem("termsAccepted");
        if (hasAccepted) {
            // If terms have already been accepted, redirect to home page
            navigate("/");
        }
    }, [navigate]);

    const handleAcceptTerms = () => {
        // Save terms acceptance in localStorage
        localStorage.setItem("termsAccepted", "true");
    };

    return (
        <div className="container mx-auto flex justify-center items-center h-screen">
            <div className="bg-black border border-slate-800 text-white rounded-lg p-8 shadow-lg max-w-lg">
                <div className="mb-5 text-center">
                    <Logo />
                </div>
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Terms and Conditions
                </h1>
                <div className="mb-4">
                    <ul className="list-disc list-inside space-y-2">
                        <li>
                            This platform is for educational purposes and
                            demonstrates web development skills.
                        </li>
                        <li>
                            Do not share or upload any content violating legal
                            or ethical standards.
                        </li>
                        <li>
                            All uploads should be under 100 MB to ensure smooth
                            performance.
                        </li>
                        <li>
                            Avoid uploading harmful or offensive material.
                        </li>
                        <li>
                            By using this platform, you agree to our privacy
                            policies and terms of service.
                        </li>
                    </ul>
                </div>

                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        id="termsCheckbox"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                        className="mr-2 transform scale-125"
                    />
                    <label htmlFor="termsCheckbox" className="font-bold">
                        I agree to the terms and conditions
                    </label>
                </div>

                <div className="text-center">
                    {isChecked ? (
                        <Link
                            to="/"
                            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
                            onClick={handleAcceptTerms}
                        >
                            Continue
                        </Link>
                    ) : (
                        <button
                            disabled
                            className="bg-gray-400 text-white font-bold py-2 px-4 rounded cursor-not-allowed"
                        >
                            Agree to Continue
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
