import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

function TransactionDialog({ subtitle, isShowing, setShowTxModal, transaction }) {
  return (
    <Transition.Root show={isShowing} as={Fragment}>
      <Dialog as="div" auto-reopen="true" className="fixed z-10 inset-0 overflow-y-auto" onClose={setShowTxModal}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white border-2 border-black px-4 py-2 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:px-6 sm:pb-6">
              <div className="flex flex-col gap-4">
                {/* <div className="mb-2 flex flex-row gap-2 text-xxs font-work font-bold">
                  <span className="tracking-widest">//////////////</span>
                  <span className="uppercase">REMIX! Club</span>
                  <span className="tracking-widest">◆◆◆</span>
                  <span className="uppercase">{subtitle}</span>
                  <span className="tracking-widest">//////////////</span>
                </div> */}
                <h3 className="uppercase font-barlow font-black text-3xl tracking-wide">
                  {/* { transactionStatus === 'mining' && <>Processing...</> }
                  { transactionStatus === 'success' && <>Confirmed!</> }
                  { transactionStatus === 'failed' && <>Transaction Rejected</> } */}
                </h3>
                <p className="font-work font-regular text-md whitespace-pre-wrap">
                  {/* { transactionStatus === 'mining' && <>Please wait while your transaction confirms.</> }
                  { transactionStatus === 'success'
                    && (
                    <>
                    { transactionType == 'mint' && (
                      <>
                      Check out the results on
                      {' '}
                      <a href="https://opensea.io/account?search[sortBy]=LAST_TRANSFER_DATE&search[sortAscending]=false" target="_blank" rel="noreferrer" className="outline-none font-work font-semibold text-md text-ape-blue hover:text-blue-900">OpenSea</a>
                      .
                      </>
                    )}
                    { transactionType == 'approval' && (
                      <>
                      Awesome! Your tokens are approved.
                      </>
                    )}
                    { transactionType == 'claim' && (
                      <>
                      Awesome! Your tokens were claimed.
                      </>
                    )}
                    </>
                    )}
                  { transactionStatus === 'failed'
                    && (
                    <>
                      Please try again.
                    </>
                    )} */}
                </p>
                <button
                  type="button"
                  className="absolute top-0 right-0 -mr-4 -mt-4 h-8 w-8 bg-black text-white text-center outline-none"
                  onClick={() => setShowTxModal(false)}
                >
                  𝖷
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default TransactionDialog;
