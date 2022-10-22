/* global window */
import verifyChainId from 'moralis-v1/lib/node/utils/verifyChainId';
import AbstractWeb3Connector from 'moralis-v1/lib/node/Web3Connector/AbstractWeb3Connector';
import { ConnectorEvents } from 'moralis-v1/lib/node/Web3Connector/events';
import { getMoralisRpcs } from 'moralis-v1/lib/node/Web3Connector/MoralisRpcs';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'

export const CoinbaseWalletEvent = Object.freeze({
  ACCOUNTS_CHANGED: 'accountsChanged',
  CHAIN_CHANGED: 'chainChanged',
  DISCONNECT: 'disconnect',
});

/**
 * Connector to connect an WalletConenct provider to Moralis
 * Note: this assumes using WalletConnect v1
 * // TODO: support WalletConnect v2
 */
class CoinbaseWalletWeb3Connector extends AbstractWeb3Connector {
  type = 'CoinbaseWallet';

  async activate({ chainId: providedChainId, appName, appLogoUrl, darkMode} = {}) {
    // Cleanup old data if present to avoid using previous sessions
    try {
      await this.deactivate();
    } catch (error) {
      // Do nothing
    }

    if (!this.provider) {
      let coinbaseWalletProvider;

      const coinbaseWallet = new CoinbaseWalletSDK({
        appName: appName,
        appLogoUrl: appLogoUrl,
        darkMode: darkMode
      })

      try {
        let rpc = getMoralisRpcs('8a10fc552a3550bd639c281d')[parseInt(providedChainId, 16)];
        console.log("provviedChainId", providedChainId);
        coinbaseWalletProvider = coinbaseWallet.makeWeb3Provider(rpc, providedChainId)
      } catch (error) {
        // Do nothing. User might not need walletconnect
        console.log(error);
      }

      if (!coinbaseWalletProvider) {
        throw new Error(
          'Cannot enable CoinbaseWallet: dependency "coinbaseWalletProvider" is missing'
        );
      }

      this.provider = coinbaseWalletProvider
    }

    if (!this.provider) {
      throw new Error('Could not connect with CoinbaseWallet, error in connecting to provider');
    }

    const accounts = await this.provider.enable();
    const account = accounts[0].toLowerCase();
    const { chainId } = this.provider;
    const verifiedChainId = verifyChainId(chainId);

    this.account = account;
    this.chainId = verifiedChainId;

    this.subscribeToEvents(this.provider);

    return { provider: this.provider, account, chainId: verifiedChainId };
  }

  async deactivate() {
    this.unsubscribeToEvents(this.provider);

    try {
      if (window) {
        window.localStorage.removeItem('coinbasewallet');
      }
    } catch (error) {
      // Do nothing
    }

    this.account = null;
    this.chainId = null;

    if (this.provider) {
      try {
        await this.provider.disconnect();
      } catch {
        // Do nothing
      }
    }
  }
}

export default CoinbaseWalletWeb3Connector;