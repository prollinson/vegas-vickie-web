import {useState, Fragment} from 'react';
import { Dialog, Transition } from '@headlessui/react'
import RedemptionCustomer from '../../models/RedemptionCustomer';
import { useMoralis } from 'react-moralis';

function RedemptionForm({open, onClose, selectedPerk}) {
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

    if(!user) return;
    if(selectedPerk == null) {
      throw new Error('No perk selected');
    }

    console.log("selectedperk", selectedPerk);
    console.log(selectedPerk.id);

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

    console.log(redemptionCode.get("code"));

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {!redemptionCode && (
                  <>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Redeem Perks
                  </Dialog.Title>
                  <p></p>
                  <div className="redemption-form">
                    <form onSubmit={handleSubmit}>
                      <p>First Name</p>
                      <input type="name" value={firstName.value} onChange={(e) => setFirstname(e.target.value)} disabled={formDisabled}/>

                      <p>Last Name</p>
                      <input type="name" value={lastName.value} onChange={(e) => setLastName(e.target.value)} disabled={formDisabled}/>

                      <p>Email</p>
                      <input type="email" value={email.value} onChange={(e) => setEmail(e.target.value)} disabled={formDisabled}/>

                      <p>Date of Birth</p>
                      <input type="input" value={birthdate.value} onChange={(e) => setBirthdate(e.target.value)} disabled={formDisabled}/>

                      <button type="submit">Submit</button>
                    </form>

                    {formError && (
                      <p className="text-red-500">{formError}</p>
                    )}
                  </div>
                  </>
                  )}

                  {redemptionCode && (
                    <>
                    <h2>Your redemption code is</h2>
                    <h1>{redemptionCode}</h1>
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