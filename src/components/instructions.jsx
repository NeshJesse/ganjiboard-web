import { useState } from "react";
import { FaArrowRight, FaArrowLeft, FaTimes } from "react-icons/fa";

export default function InstructionsModal({ onClose }) {
  const steps = [
     {
      title: "Welcome to Home",
      text: "This is the starting point. Here’s how to use the app.",
      image: "/blankcanvas.png",
    },
    {
      title: "Creating New Boards",
      text: "Click the New Board Button. This will allow you to create a new board where you can begin adding content and organizing your ideas.",
      image: "/newboard.png",
    },
    {
      title: "Creating New Cards",
      text: "On the right side of your screen click the floating blue button,choose a card,.Each card is unique and can be for Income,Expense,Savings,Shopping list, or wishlist",
      image: "/newcard.png",
    },
    {
      title: "Cards",
      text: "Cards can be moved around and placed anywhere on the board.To edit a cards content simply click on it twice.",
      image: "/cardedit.png",
    },
    {
      title: "All Set!",
      text: "You’re ready to start using the app. Happy Planning!",
      image: "/congrats.jpeg",
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onClose(); // finish
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg relative animate-fadeIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <FaTimes size={20} />
        </button>

        {/* Step content */}
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">{steps[currentStep].title}</h2>
          <p className="text-gray-600 mb-4">{steps[currentStep].text}</p>
          {steps[currentStep].image && (
            <img
              src={steps[currentStep].image}
              alt={`Step ${currentStep + 1}`}
              className="mx-auto mb-4 rounded-lg shadow"
            />
          )}
          <p className="text-sm text-gray-400">Step {currentStep + 1} of {steps.length}</p>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center px-4 py-2 rounded-lg border ${
              currentStep === 0
                ? "text-gray-300 border-gray-200 cursor-not-allowed"
                : "text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>

          <button
            onClick={handleNext}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {currentStep === steps.length - 1 ? "Finish" : "Next"}
            {currentStep !== steps.length - 1 && <FaArrowRight className="ml-2" />}
          </button>
        </div>
      </div>
    </div>
  );
}
