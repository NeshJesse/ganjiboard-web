import { FiDollarSign, FiPieChart, FiTarget } from 'react-icons/fi';

const PreviewSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            See Your <span className="text-green-600">Money Flow</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ganji Board's visual workspace shows how money moves between income, expenses, and goals.
          </p>
        </div>
    
        {/* Screenshot Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Macbook Frame Mockup */}
          <div className="relative mx-auto" style={{ maxWidth: '800px' }}>
            {/* Macbook top bar */}
            <div className="h-6 bg-gray-200 rounded-t-lg flex items-center justify-center">
              <div className="flex space-x-2 absolute left-4">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
              </div>
            </div>
            
            {/* Screenshot */}
            <div className="bg-gray-50 border-x border-b border-gray-200 rounded-b-lg overflow-hidden">
              {/* App UI Mockup */}
              <div className="p-4 bg-white">
                {/* Board Header */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">My Financial Board</h3>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-green-100 text-green-600 rounded-md text-sm">+ Income</button>
                    <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">+ Expense</button>
                  </div>
                </div>
                
                {/* Visual Board */}
                <div className="relative h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  {/* Money Pot (Center) */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-green-100 rounded-full flex flex-col items-center justify-center shadow-md">
                    <span className="text-gray-600 text-sm">Total</span>
                    <span className="text-2xl font-bold text-green-600">$4,280</span>
                  </div>
                  
                  {/* Income Card (Top) */}
                  <div className="absolute top-8 left-1/4 transform -translate-x-1/2 w-40 bg-white p-3 rounded-lg shadow-sm border-l-4 border-green-500">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                        <FiDollarSign className="text-green-600" />
                      </div>
                      <span className="font-medium">Salary</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">$3,500</p>
                    <div className="h-1 w-full bg-gray-200 mt-2">
                      <div className="h-1 bg-green-500 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  
                  {/* Expense Card (Right) */}
                  <div className="absolute top-1/2 right-8 transform -translate-y-1/2 w-40 bg-white p-3 rounded-lg shadow-sm border-l-4 border-blue-500">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                        <FiPieChart className="text-blue-600" />
                      </div>
                      <span className="font-medium">Rent</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">$1,200</p>
                    <div className="h-1 w-full bg-gray-200 mt-2">
                      <div className="h-1 bg-blue-500 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  
                  {/* Goal Card (Bottom) */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-40 bg-white p-3 rounded-lg shadow-sm border-l-4 border-purple-500">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                        <FiTarget className="text-purple-600" />
                      </div>
                      <span className="font-medium">New Laptop</span>
                    </div>
                    <p className="text-xl font-bold text-gray-800">$1,500</p>
                    <div className="h-1 w-full bg-gray-200 mt-2">
                      <div className="h-1 bg-purple-500 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">45% saved</p>
                  </div>
                  
                  {/* Connection Lines (SVG) */}
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    {/* Income to Money Pot */}
                    <path 
                      d="M200,80 Q300,150 400,200" 
                      stroke="#10B981" 
                      strokeWidth="2" 
                      fill="none" 
                      strokeDasharray="5,5"
                    />
                    {/* Money Pot to Expense */}
                    <path 
                      d="M400,200 Q500,250 600,200" 
                      stroke="#3B82F6" 
                      strokeWidth="2" 
                      fill="none" 
                      strokeDasharray="5,5"
                    />
                    {/* Money Pot to Goal */}
                    <path 
                      d="M400,200 Q300,300 400,350" 
                      stroke="#8B5CF6" 
                      strokeWidth="2" 
                      fill="none" 
                      strokeDasharray="5,5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Caption */}
          <div className="mt-8 text-center text-gray-500 max-w-2xl mx-auto">
            <p>Drag and connect cards to visualize how money moves between different parts of your financial life.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewSection;