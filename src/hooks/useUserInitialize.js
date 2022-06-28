import {useMoralis} from 'react-moralis';

function useUserInitialize() {
  const {Moralis, user, enableWeb3} = useMoralis();

  const initUser = async function() {
    if (user) {
      if (!Moralis.ensureWeb3IsInstalled()) {
        const userProvider = user.get('provider');
        // TODO: Remove hardcoded chainId
        let providerOptions
        switch (userProvider) {
          case 'web3Auth':
            providerOptions = {
              provider: 'web3Auth',
              chainId: '0x4',
              theme: 'light'
            }
            break
          default:
            // metamask
            providerOptions = null
        }
        
        try {
          await enableWeb3(providerOptions)
        } catch (err) {
          console.log(err);
        }
      }
    }
  }

  return {
    initUser
  }
}

export default useUserInitialize;