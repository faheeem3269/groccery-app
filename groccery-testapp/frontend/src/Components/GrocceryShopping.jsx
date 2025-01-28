import React from 'react'

function GrocceryShopping() {
  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center sm:w-auto'>
        <div className='text-5xl font-bold text-gray-900 mb-8'>
            <h >Smart Grocery Shopping,<span className='text-emerald-600'>Made Simple</span> </h>
        </div>
        <p className='text-xl max-w-3xl justify-center mx-auto mb-10'>Organize your grocery lists, track prices, and save money with our intelligent shopping assistant. Join over 50,000 smart shoppers saving time and money every day.</p>
        <div className='flex justify-center space-x-4'>
          <button className='px-8 py-3 bg-emerald-600 text-white font-medium rounded-lg shadow-lg hover:bg-emerald-700 transition-colors'>Get Started Free</button>
          <button className='px-8 py-3 bg-white text-emerald-600 font-medium rounded-lg shadow-lg hover:bg-gray-50 transition-colors'>Watch Demo</button>
        </div>
        <div className='flex  justify-center space-x-4 mt-8'>
          <div className='flex items-center'>
            <img src='' alt='' />
            <span className='text-gray-600'>4.9/5 ratings</span>
            
          </div>
          <div className='flex items-center'>
            <img src='' alt='' />
            <span  className='text-gray-600'>50K+ Users</span>
           
          </div>
          <div className='flex items-center'>
            <img src='' alt='' />
            <span  className='text-gray-600'>Secure & Private</span>
            
          </div>

        </div>
        <div>
          <h2 className='text-3xl font-bold max-w-3xl justify-center mx-auto mt-12'>Everything you need to shop smarter.</h2>
          <p className='text-xl  justify-center text-gray-600 mt-8'>Simple yet powerful features to make grocery shopping a breeze</p>
        </div>
        <div className='grid md:grid-cols-3 gap-8 mt-10 h-52'>
          <div className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100  '>
            <h1 className='text-xl font-bold'>Smart List</h1>
            <p className="text-gray-600 justify-center">Create and manage multiple shopping lists with smart categorization and priority settings.</p>
          </div>
          <div className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100'>
            <h1 className='text-xl font-bold'>Price History</h1>
            <p className="text-gray-600">Track price changes over time and get notified when your favorite items go on sale.</p>
          </div>
          <div className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100' >
            <h1 className='text-xl font-bold'>Mobile Ready</h1>
            <p className="text-gray-600">Access your lists anywhere with our mobile-friendly design and offline support.</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default GrocceryShopping
