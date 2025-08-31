import { FiArrowRight } from 'react-icons/fi';

const HeroSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            See where your money goes
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            A minimalist kanban-style board to visualize your income, expenses, and financial goals at a glance.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a 
              href="#" 
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition duration-200 flex items-center justify-center"
            >
              Get Started <FiArrowRight className="ml-2" />
            </a>
            <a 
              href="#demo" 
              className="border border-gray-300 hover:border-green-600 text-gray-700 hover:text-green-600 px-6 py-3 rounded-md font-medium transition duration-200 flex items-center justify-center"
            >
              See Demo
            </a>
          </div>
        </div>
        
        <div className="md:w-1/2 bg-gray-50 p-6 rounded-lg shadow-sm">
          <div className="flex space-x-4 mb-4">
            {/* Income Column */}
            <div className="kanban-column w-1/3">
              <h3 className="font-medium text-gray-700 mb-3">Income</h3>
              <div className="kanban-card bg-white p-3 mb-3 rounded border-l-4 border-green-500">
                <p className="font-medium">Salary</p>
                <p className="text-green-600">+$2,500</p>
              </div>
            </div>
            
            {/* Expenses Column */}
            <div className="kanban-column w-1/3">
              <h3 className="font-medium text-gray-700 mb-3">Expenses</h3>
              <div className="kanban-card bg-white p-3 mb-3 rounded border-l-4 border-red-500">
                <p className="font-medium">Rent</p>
                <p className="text-red-500">-$800</p>
              </div>
              <div className="kanban-card bg-white p-3 mb-3 rounded border-l-4 border-red-500">
                <p className="font-medium">Groceries</p>
                <p className="text-red-500">-$150</p>
              </div>
            </div>
            
            {/* Goals Column */}
            <div className="kanban-column w-1/3">
              <h3 className="font-medium text-gray-700 mb-3">Goals</h3>
              <div className="kanban-card bg-white p-3 mb-3 rounded border-l-4 border-yellow-400">
                <p className="font-medium">New Laptop</p>
                <p className="text-gray-500">$500/$1,200</p>
              </div>
            </div>
          </div>
          
          {/* Summary Section */}
          <div className="bg-white p-4 rounded border-t border-gray-200">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Total</span>
              <div>
                <span className="text-green-600">+$2,500</span>
                <span className="text-red-500 ml-2">-$950</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Balance</span>
              <span className="font-medium">$1,550</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;