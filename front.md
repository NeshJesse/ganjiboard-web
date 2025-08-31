import HeroSection from '../components/hero';
import PreviewSection from '../components/preview';
import { FiArrowRight, FiDollarSign, FiPieChart, FiList, FiTarget, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-800">
            <span className="text-green-600">Ganji</span> Board
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-green-600">Features</a>
            <a href="#works" className="text-gray-600 hover:text-green-600">How It Works</a>
            <a href="#" className="text-gray-600 hover:text-green-600">About</a>
          </div>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Join Waitlist
          </button>
        </div>
      </nav>

    <HeroSection/>
      
    <PreviewSection/>

      {/* Problem Statement */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Budgeting Should Be <span className="text-green-600">Intuitive</span>, Not Complicated
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Traditional budgeting apps feel like spreadsheets or dashboards — rigid and disconnected. Ganji Board gives you a visual, flexible workspace where you can see exactly how your money flows between income, expenses, and goals.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16" id='features'>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Everything in <span className="text-green-600">One Place</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <FiDollarSign className="text-green-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Track Income</h3>
              <p className="text-gray-600">See all your income sources clearly visualized on your board.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FiPieChart className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Manage Expenses</h3>
              <p className="text-gray-600">Categorize and track spending with simple visual cards.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <FiTarget className="text-purple-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Set Budgets</h3>
              <p className="text-gray-600">Create flexible budgets that adapt to your changing needs.</p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <FiList className="text-yellow-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Build Wishlists</h3>
              <p className="text-gray-600">Save for things you want and see progress visually.</p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <FiTrendingUp className="text-red-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Define Goals</h3>
              <p className="text-gray-600">Set and track financial goals with clear visual progress.</p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <FiCheckCircle className="text-indigo-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">See Your Total Money Pot</h3>
              <p className="text-gray-600">Understand your complete financial picture at a glance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16" id='works'>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            How <span className="text-green-600">Ganji Board</span> Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-green-600 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Add Your Money Sources</h3>
              <p className="text-gray-600">Connect accounts or enter income manually to get started.</p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-green-600 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Track Spending & Goals</h3>
              <p className="text-gray-600">Create cards for expenses, budgets, and financial objectives.</p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-green-600 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">See Your Money Flow</h3>
              <p className="text-gray-600">Watch how money moves between cards on your visual board.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="bg-green-600 rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Visualize Your Finances?</h2>
            <p className="text-green-100 text-xl mb-8">Join early access and transform how you manage money.</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition font-medium flex items-center justify-center">
                Download Early Access <FiArrowRight className="ml-2" />
              </button>
              <button className="px-6 py-3 border border-white text-white rounded-lg hover:bg-green-700 transition font-medium">
                Join the Waitlist
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold text-gray-800 mb-4 md:mb-0">
              <span className="text-green-600">Ganji</span> Board
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-green-600">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-green-600">Terms</a>
              <a href="#" className="text-gray-500 hover:text-green-600">Contact</a>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-green-600">Twitter</a>
              <a href="#" className="text-gray-500 hover:text-green-600">Instagram</a>
              <a href="#" className="text-gray-500 hover:text-green-600">LinkedIn</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Ganji Board. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
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
