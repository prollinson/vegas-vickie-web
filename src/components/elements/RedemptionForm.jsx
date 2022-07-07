import {useState, Fragment} from 'react';
import { Dialog, Transition } from '@headlessui/react'
import RedemptionCustomer from '../../models/RedemptionCustomer';
import { useMoralis } from 'react-moralis';

function RedemptionForm({open, onClose, selectedPerk, requireDOB}) {
  const {Moralis, user} = useMoralis();  

  const [firstName, setFirstname] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const [formError, setFormError] = useState(null);

  const [redemptionCode, setRedemptionCode] = useState(null);

  const [formDisabled, setFormDisabled] = useState(false);

  const retrieveCustomer = async () => {
    const query = Moralis.Query(RedemptionCustomer);
    query.equalTo("user", user);
    const results = await query.find()

    if (results.length > 0) {

    }

    onClose();
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if(!user) return;
    if(selectedPerk == null) {
      throw new Error('No perk selected');
    }

    console.log("selectedperk", selectedPerk);
    console.log(selectedPerk.id);

    if(!firstName & !lastName || !email) {
      setFormError('Please fill out all fields');
    };

    if(requireDOB && !birthdate) {
      setFormError('Please fill out all fields');
    }

    if(formError) return false;

    let redemptionCode = null;
    try {
      redemptionCode = await Moralis.Cloud.run(
        "submitRedemptionInformation",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          birthdate: birthdate,
          tokenPerkId: selectedPerk.id
        }
      );
    } catch (error) {
      console.log(error);
      setFormError(error.message);
      return;
    }

    setRedemptionCode(redemptionCode.get("code"));
  }

  const handleOnClose = () => {
    setFormError(null);
    setRedemptionCode(null);
    onClose();
  }


  return (
    <>
    <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleOnClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
            
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-stone-100 p-6 text-left align-middle shadow-xl transition-all">
                {!redemptionCode && (
                  <>
                  <Dialog.Title
                    as="h3"
                    className="font-display font-bold text-xl leading-6 uppercase text-gray-900"
                  >
                    Redeem Perks
                  </Dialog.Title>

                  <div className="redemption-form">
                    <p className='font-display text-black w-full pt-2'>Please enter your details below. On check-in, we will verify using these details so please ensure that they are correct.</p>
                    <form onSubmit={handleSubmit} className="mt-4 w-2/3 mx-auto">

                      {formError && (
                        <p className="text-red-500">{formError}</p>
                      )}

                      <p className='font-display text-black w-full pt-2 font-bold uppercase'>First Name</p>
                      <input className="w-full p-2" type="name" value={firstName.value} onChange={(e) => setFirstname(e.target.value)} disabled={formDisabled}/>

                      <p className='font-display text-black w-full pt-2 font-bold uppercase'>Last Name</p>
                      <input className="w-full p-2" type="name" value={lastName.value} onChange={(e) => setLastName(e.target.value)} disabled={formDisabled}/>

                      <p className='font-display text-black w-full pt-2 font-bold uppercase'>Email</p>
                      <input className="w-full p-2" type="email" value={email.value} onChange={(e) => setEmail(e.target.value)} disabled={formDisabled}/>

                      {requireDOB && (
                        <>
                          <p className='font-display text-black w-full pt-2 font-bold uppercase'>Date of Birth</p>
                          <input className="w-full p-2" type="date" value={birthdate.value} onChange={(e) => setBirthdate(e.target.value)} disabled={formDisabled}/>
                        </>
                      )}

                      <div className='flex w-full justify-center'>
                        <button type="submit" className='py-4 px-8 bg-vickie-yellow mt-4 font-display uppercase font-bold justify-center'>Submit</button>
                      </div>
                    </form>

                    <p className='font-display text-black w-full pt-4'>Circa is a 21+ Casino. All guests must be 21 years or older.</p>
                  </div>
                  </>
                  )}

                  {redemptionCode && (
                    <>
                      <Dialog.Title
                        as="h3"
                        className="font-display font-bold text-xl leading-6 uppercase text-gray-900"
                      >
                        You're all set!
                      </Dialog.Title>
                      <p className='font-display text-black w-full pt-2'>Thanks. Here’s your redemption code that you can use when booking your room:</p>
                      <div className='border border-stone-300 text-4xl flex justify-center p-4 mt-10 mb-10 bg-stone-200'>
                        <p className='text-black'>{redemptionCode}</p>
                      </div>
                      <div className='flex w-full justify-center'>
                        <button className='py-4 px-8 bg-vickie-yellow mt-4 font-display uppercase font-bold justify-center' onClick={handleOnClose}>Close</button>
                      </div>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default RedemptionForm;