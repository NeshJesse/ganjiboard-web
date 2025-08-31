import React from 'react';
import { FiArrowRight, FiUsers, FiEye, FiShare2, FiHeart, FiTarget, FiTrendingUp, FiCheckCircle, FiDollarSign, FiPieChart } from 'react-icons/fi';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-800">
            <span className="text-green-600">Ganji</span> Board
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-green-600 transition">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-green-600 transition">How It Works</a>
            <a href="#sharing" className="text-gray-600 hover:text-green-600 transition">Sharing</a>
          </div>
          <a href='/home'>
           <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Try It Now
           </button>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Budgeting Made <span className="text-green-600">Visual</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Whether you're a freelancer tracking projects, a parent managing household expenses, 
            or a couple planning your future together - create budgets that make sense visually.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <a href='/home'>
            <button className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold text-lg flex items-center justify-center">
              Start Your Budget <FiArrowRight className="ml-2" />
            </button>
            </a>
            <a href='/demo'>
            <button className="px-8 py-4 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition font-semibold text-lg">
              See Live Demo
            </button>
            </a>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center space-x-8 text-gray-500">
            <div className="flex items-center space-x-2">
              <FiUsers className="text-green-600" />
              <span>For Everyone</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiShare2 className="text-blue-600" />
              <span>Share & Collaborate</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiEye className="text-purple-600" />
              <span>Visual First</span>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshot Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              See Your Money <span className="text-green-600">At a Glance</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Move beyond spreadsheets and confusing apps. Ganji Board shows your entire financial picture 
              on one visual canvas that anyone can understand.
            </p>
          </div>

          {/* Main Screenshot */}
          <div className="relative max-w-6xl mx-auto mb-8">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border">
              {/* Browser Header */}
              <div className="h-12 bg-gray-100 flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="bg-white rounded-md px-4 py-1 mx-8 text-sm text-gray-600">
                    ganjiboard.com - Family Budget 2024
                  </div>
                </div>
              </div>
              
              {/* App Screenshot Mockup */}
              <div className="p-6 bg-gray-50 min-h-[500px]">
                {/* Toolbar */}
                <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold">Family Budget - December 2024</h3>
                  <div className="flex space-x-2">
                    <button className="px-3 py-2 bg-green-100 text-green-700 rounded-md text-sm font-medium">
                      + Add Income
                    </button>
                    <button className="px-3 py-2 bg-blue-100 text-blue-700 rounded-md text-sm font-medium">
                      + Add Expense
                    </button>
                    <button className="px-3 py-2 bg-purple-100 text-purple-700 rounded-md text-sm font-medium">
                      + Add Goal
                    </button>
                  </div>
                </div>

                {/* Visual Budget Board */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Income Column */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-700 text-center py-2">Income Sources</h4>
                    <div className="bg-white rounded-lg p-4 border-l-4 border-green-500 shadow-sm">
                      <div className="flex items-center mb-2">
                        <FiDollarSign className="text-green-600 mr-2" />
                        <span className="font-medium">John's Salary</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600 mb-2">$4,500</div>
                      <div className="text-sm text-gray-500">Monthly</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border-l-4 border-green-500 shadow-sm">
                      <div className="flex items-center mb-2">
                        <FiDollarSign className="text-green-600 mr-2" />
                        <span className="font-medium">Sarah's Freelance</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600 mb-2">$2,300</div>
                      <div className="text-sm text-gray-500">Variable</div>
                    </div>
                  </div>

                  {/* Expenses Column */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-700 text-center py-2">Essential Expenses</h4>
                    <div className="bg-white rounded-lg p-4 border-l-4 border-red-500 shadow-sm">
                      <div className="flex items-center mb-2">
                        <FiPieChart className="text-red-600 mr-2" />
                        <span className="font-medium">Rent</span>
                      </div>
                      <div className="text-2xl font-bold text-red-600 mb-2">$1,800</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full w-full"></div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500 shadow-sm">
                      <div className="flex items-center mb-2">
                        <FiPieChart className="text-orange-600 mr-2" />
                        <span className="font-medium">Groceries</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-600 mb-2">$650</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full w-4/5"></div>
                      </div>
                    </div>
                  </div>

                  {/* Goals Column */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-700 text-center py-2">Savings Goals</h4>
                    <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500 shadow-sm">
                      <div className="flex items-center mb-2">
                        <FiTarget className="text-purple-600 mr-2" />
                        <span className="font-medium">Emergency Fund</span>
                      </div>
                      <div className="text-xl font-bold text-purple-600 mb-2">$3,200 / $10,000</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className="bg-purple-500 h-2 rounded-full w-1/3"></div>
                      </div>
                      <div className="text-sm text-gray-500">32% complete</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500 shadow-sm">
                      <div className="flex items-center mb-2">
                        <FiHeart className="text-blue-600 mr-2" />
                        <span className="font-medium">Vacation</span>
                      </div>
                      <div className="text-xl font-bold text-blue-600 mb-2">$1,850 / $3,500</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className="bg-blue-500 h-2 rounded-full w-1/2"></div>
                      </div>
                      <div className="text-sm text-gray-500">53% complete</div>
                    </div>
                  </div>

                  {/* Summary Column */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-700 text-center py-2">This Month</h4>
                    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 border shadow-sm">
                      <div className="text-center mb-4">
                        <div className="text-sm text-gray-600 mb-1">Available</div>
                        <div className="text-3xl font-bold text-green-600">$2,180</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total Income</span>
                          <span className="font-medium text-green-600">+$6,800</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Fixed Expenses</span>
                          <span className="font-medium text-red-600">-$2,450</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Goals Saving</span>
                          <span className="font-medium text-purple-600">-$1,200</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Flexible Budget</span>
                          <span className="font-medium text-blue-600">-$970</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-gray-600 max-w-2xl mx-auto">
            <p className="text-lg">
              <strong>Real screenshot from Ganji Board:</strong> See how the Johnson family organizes their 
              household budget visually, with clear progress tracking and shared access.
            </p>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Perfect for <span className="text-green-600">Every Budget</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From solo entrepreneurs to growing families, Ganji Board adapts to your unique financial situation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Freelancers & Entrepreneurs */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <FiTrendingUp className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Freelancers & Entrepreneurs</h3>
              <p className="text-gray-600 mb-4">
                Track irregular income, manage business expenses, and plan for tax season with visual clarity.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Project-based income tracking</li>
                <li>• Business expense categorization</li>
                <li>• Tax savings visualization</li>
              </ul>
            </div>

            {/* Families & Couples */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <FiUsers className="text-green-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Families & Couples</h3>
              <p className="text-gray-600 mb-4">
                Share budgets, align on goals, and make financial decisions together with transparent visuals.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Real-time collaboration</li>
                <li>• Kid-friendly goal tracking</li>
                <li>• Household expense sharing</li>
              </ul>
            </div>

            {/* Young Professionals */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <FiTarget className="text-purple-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Young Professionals</h3>
              <p className="text-gray-600 mb-4">
                Build healthy money habits, save for dreams, and understand where every dollar goes.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Student loan tracking</li>
                <li>• First home savings</li>
                <li>• Career investment planning</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sharing & Collaboration */}
      <section className="py-16 bg-white" id="sharing">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Budget <span className="text-green-600">Together</span>
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Money conversations don't have to be difficult. Share your board with your spouse, 
                partner, or family members for complete financial transparency.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <FiShare2 className="text-blue-600 text-sm" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Real-time Collaboration</h4>
                    <p className="text-gray-600">Both partners can update expenses and track progress simultaneously.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <FiEye className="text-green-600 text-sm" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Privacy Controls</h4>
                    <p className="text-gray-600">Choose what to share and what to keep private with flexible permissions.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                    <FiCheckCircle className="text-purple-600 text-sm" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Goal Accountability</h4>
                    <p className="text-gray-600">Celebrate wins together and stay motivated with shared progress tracking.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Collaboration Visual */}
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Shared Board: Home Goals</h4>
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-white text-xs font-bold">J</span>
                    </div>
                    <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-white text-xs font-bold">S</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">New Car Fund</span>
                      <span className="text-sm text-blue-600">Updated by John</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">$8,500 / $15,000</div>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Kitchen Renovation</span>
                      <span className="text-sm text-green-600">Updated by Sarah</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">$2,300 / $12,000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50" id="how-it-works">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Simple. Visual. <span className="text-green-600">Effective.</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No complex setup or financial jargon. Start budgeting visually in minutes.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-green-600 font-bold text-2xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Add Your Money</h3>
              <p className="text-gray-600">
                Start by adding your income sources - salary, freelance work, side hustles, 
                or any money coming in. It takes just seconds.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-green-600 font-bold text-2xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Create Visual Cards</h3>
              <p className="text-gray-600">
                Make cards for expenses (rent, groceries, utilities) and goals (vacation, 
                emergency fund). Watch your budget come to life visually.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-green-600 font-bold text-2xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Track & Share</h3>
              <p className="text-gray-600">
                Update amounts, track progress, and share with family. Everything updates 
                in real-time so everyone stays informed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white" id="features">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Everything You Need to <span className="text-green-600">Budget Smart</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <FiDollarSign className="text-green-600 text-2xl mb-3" />
              <h3 className="font-semibold mb-2">Multiple Income Sources</h3>
              <p className="text-gray-600 text-sm">Track salary, freelance, side hustles, and passive income all in one place.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <FiPieChart className="text-blue-600 text-2xl mb-3" />
              <h3 className="font-semibold mb-2">Smart Expense Categories</h3>
              <p className="text-gray-600 text-sm">Organize spending with customizable categories that make sense to you.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <FiTarget className="text-purple-600 text-2xl mb-3" />
              <h3 className="font-semibold mb-2">Visual Goal Tracking</h3>
              <p className="text-gray-600 text-sm">See progress toward your dreams with beautiful progress indicators.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <FiShare2 className="text-red-600 text-2xl mb-3" />
              <h3 className="font-semibold mb-2">Family Collaboration</h3>
              <p className="text-gray-600 text-sm">Share budgets with spouse or family members for complete transparency.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <FiTrendingUp className="text-indigo-600 text-2xl mb-3" />
              <h3 className="font-semibold mb-2">Progress Insights</h3>
              <p className="text-gray-600 text-sm">Understand spending patterns and optimize your financial health.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <FiEye className="text-yellow-600 text-2xl mb-3" />
              <h3 className="font-semibold mb-2">At-a-Glance Overview</h3>
              <p className="text-gray-600 text-sm">See your entire financial picture without digging through spreadsheets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-blue-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to See Your Money Clearly?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of individuals and families who've transformed their budgeting with visual clarity.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href='/home'>
            <button className="px-8 py-4 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition font-semibold text-lg flex items-center justify-center">
              Start Free Today <FiArrowRight className="ml-2" />
            </button>
            </a>
            <a href='/home'>
            <button className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-800 transition font-semibold text-lg">
              Watch 2-Min Demo
            </button>
            </a>
          </div>
          
          <p className="text-white opacity-75 text-sm mt-6">
            Try it Now. No credit card required • Set up in under 2 minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">
                <span className="text-green-400">Ganji</span> Board
              </div>
              <p className="text-gray-400">
                Visual budgeting for everyone. Simple, collaborative, and designed for real life.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Templates</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Budgeting Guide</a></li>
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2024 Ganji Board. Made with ❤️ for better budgeting.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;