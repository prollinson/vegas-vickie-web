import * as React from 'react';

import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      {/* Vision Section */}
      <div className="col-span-12">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 border-b-2 border-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white">Vision</h2>
            <p className="mt-4 text-lg text-white">
              Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla nec.
            </p>
          </div>
        </div>
      </div>

      {/* Collections Section */}
      <div className="col-span-12">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 border-b-2 border-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white">Collections</h2>
            <p className="mt-4 text-lg text-white">
              Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla nec.
            </p>
            <Link to="/collections" className="bg-amber-400 rounded-lg py-2 px-4 mt-4 text-lg text-white">View Collections</Link>
          </div>
        </div>
      </div>

      {/* Join Section */}
      <div className="col-span-12">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 border-b-2 border-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white">Join</h2>
            <p className="mt-4 text-lg text-white">
              Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla nec.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="col-span-12">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 border-b-2 border-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white">FAQ</h2>
            <p className="mt-4 text-lg text-white">
              Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla nec.
            </p>
          </div>
        </div>
      </div>

    </>
  )
}

export default Home;