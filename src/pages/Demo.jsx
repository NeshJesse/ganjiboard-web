import { useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function Demo() {
  const steps = [
    {
      title: "Welcome to GanjiBoard",
      text: "GanjiBoard is a visual budgeting canvas. You create cards (Income, Expense, Savings, Shopping List, Wishlist, Notes), drag them around, and connect them with arrows to show money flow.",
      image: "/blankcanvas.png",
    },
    {
      title: "Creating New Boards",
      text: "Click the New Board button on the toolbar to create a fresh canvas. You can switch between boards and keep multiple projects.",
      image: "/newboard.png",
    },
    {
      title: "Adding Cards",
      text: "Use the floating + button on the right to open the card creator. Choose between Income, Expense, Savings, Shopping List, Wishlist, or Notes.",
      image: "/newcard.png",
    },
    {
      title: "Editing Cards",
      text: "Double-click any card to edit its details in-place. Budget cards support title, amount, and notes. Shopping lists support items and totals.",
      image: "/cardedit.png",
    },
    {
      title: "All Set!",
      text: "Drag, connect, and organize visually. Your work is saved automatically in your browser. Export or import JSON anytime.",
      image: "/congrats.jpeg",
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep((p) => p + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((p) => p - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="max-w-5xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">GanjiBoard Demo</h1>
            <p className="text-gray-600">A quick walkthrough with screenshots</p>
          </div>
          <div className="text-sm text-gray-500">Step {currentStep + 1} of {steps.length}</div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-3">{steps[currentStep].title}</h2>
          <p className="text-gray-600 mb-6">{steps[currentStep].text}</p>

          {steps[currentStep].image && (
            <img
              src={steps[currentStep].image}
              alt={`Step ${currentStep + 1}`}
              className="w-full max-h-[520px] object-contain rounded-lg border"
            />
          )}

          <div className="flex items-center justify-between mt-8">
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
              disabled={currentStep === steps.length - 1}
              className={`flex items-center px-4 py-2 rounded-lg ${
                currentStep === steps.length - 1
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
              {currentStep !== steps.length - 1 && <FaArrowRight className="ml-2" />}
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-5 gap-2">
          {steps.map((s, idx) => (
            <button
              key={s.title}
              onClick={() => setCurrentStep(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentStep ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to step ${idx + 1}`}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="/home" className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Open the App
          </a>
        </div>
      </div>
    </div>
  );
}
