import {ethers} from 'ethers';

declare let window: {
  ethereum: ethers.providers.ExternalProvider;
};

const query = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const networkName = await provider.getNetwork().then((res) => {
      return res.name;
    });

    // TODO: Define the variables below
    const chainId = (await provider.getNetwork()).chainId;
    const blockHeight = await provider.getBlockNumber();
    const gasPriceAsGwei = await provider.getGasPrice();
    const blockInfo = await provider.getBlockWithTransactions(blockHeight);

    if (!chainId || !blockHeight || !gasPriceAsGwei || !blockInfo) {
      throw new Error('Please complete the code');
    }

    return {
      data: {
        networkName,
        chainId,
        blockHeight,
        gasPriceAsGwei: ethers.utils.formatUnits(gasPriceAsGwei, 'gwei'),
        blockInfo,
      },
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export default query;
