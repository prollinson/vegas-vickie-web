import * as React from 'react';

function PageHeader({pageTitle}) {
  return (
    <div className="col-span-12">
      <div className="max-w-7xl mx-auto py-8 lg:py-16 px-4 sm:px-6 lg:px-8">
        <h2 className='font-display tracking-widest font-bold uppercase text-white text-3xl sm:text-4xl col-span-12 text-center'>{pageTitle}</h2>
      </div>
    </div>
  )
}

export default PageHeader;