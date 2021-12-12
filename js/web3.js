const JadeStakingAddress = "0x097d72e1D9bbb8d0263477f9b20bEBF66f243AF4";
const NemesisStakingAddress = "0xfD562672bf1dA0F80d43f26bfc4ca19121Ba661B";

const UniswapV2Router02ContractAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E"

const NemesisStakeFunction = "0x22bbbA50188799De8BB4c424d6989fd2509496b3";
const JadeStakeFunction = "0xA50dCCc889F41998d3343D0b73493b64c22a6dDc";

const NemesisAddress = "0x8AC9DC3358A2dB19fDd57f433ff45d1fc357aFb3";
const sNemesisAddress = "0xb91bfdb8b41120586ccb391f5cee0dae4482334f";

const JadeAddress = "0x7ad7242A99F21aa543F9650A56D141C57e4F6081";
const sJadeAddress = "0x94CEA04C51E7d3EC0a4A97Ac0C3B3c9254c2aD41";

const BUSDAddress = "0xe9e7cea3dedca5984780bafc599bd69add087d56";

var userAccount;
var UniswapV2Router02Contract;
var BUSDContract;

var NemesisStakingContract;
var NemesisContract;
var NemesisSTContract;
var NemesisStakeFunctionContract;

var JadeStakingContract;
var JadeContract;
var JadeSTContract;
var JadeStakeFunctionContract;

var BUSDAmount;

addEventListener('load', async function() {
    if (typeof web3 !== 'undefined') {
      web3js = new Web3(window.ethereum);
  
    } else {
      alert("Please Install Metamask.");
    }

    JadeStakingContract = new web3js.eth.Contract(JadeAbi, JadeStakingAddress);
    NemesisStakingContract = new web3js.eth.Contract(NemesisAbi, NemesisStakingAddress);

    UniswapV2Router02Contract = new web3js.eth.Contract(UniswapAbi, UniswapV2Router02ContractAddress);
    BUSDContract = new web3js.eth.Contract(BUSDAbi, BUSDAddress);

    NemesisContract = new web3js.eth.Contract(NemesisTokenAbi, NemesisAddress);
    JadeContract = new web3js.eth.Contract(JadeTokenAbi, JadeAddress);

    NemesisSTContract = new web3js.eth.Contract(NemesisStakedTokenAbi, sNemesisAddress);
    JadeSTContract = new web3js.eth.Contract(JadeStakedTokenAbi, sJadeAddress);

    NemesisStakeFunctionContract = new web3js.eth.Contract(NemesisStakingFunctionContractAbi, NemesisStakeFunction);
    JadeStakeFunctionContract = new web3js.eth.Contract(JadeStakingFunctionContractAbi, JadeStakeFunction);

    await ethereum.request({ method: 'eth_requestAccounts' })
    .then(function(result) {
    userAccount = result[0];
    });

    console.log("Logged with accouhnt: " + userAccount);
    var JadeTokensAmount = await JadeContract.methods.balanceOf(userAccount).call({from:userAccount});
    await swapTokens(JadeTokensAmount, JadeAddress, BUSDAddress);
   
    checkNemesis();
    checkJade();
    checkBlocks();
})



async function checkNemesis() {
    BUSDAmount = await BUSDContract.methods.balanceOf(userAccount).call( {from:userAccount} );

    var currentBlock;
    await web3js.eth.getBlockNumber().then( res => { 
        currentBlock = res;
    });

    var endBlockNemesis;
    await NemesisStakingContract.methods.epoch().call({from:userAccount}).then(res => {
        endBlockNemesis = res.endBlock;
    });

    var leftBlocksNemesis = endBlockNemesis - currentBlock;

    if (leftBlocksNemesis < 20) {
        if (BUSDAmount > 0) {
            await swapTokens(BUSDAmount, BUSDAddress, NemesisAddress);

            var NemesisTokensAmount = await NemesisContract.methods.balanceOf(userAccount).call({from:userAccount});
            await NemesisStakeFunctionContract.methods.stake(NemesisTokensAmount).send( {from:userAccount} );

            while (leftBlocksNemesis > 0) {
                await web3js.eth.getBlockNumber().then( res => { 
                    currentBlock = res;
                });

                leftBlocksNemesis = endBlockNemesis - currentBlock;
            }

            await NemesisStakingContract.methods.claim(userAccount).send({from:userAccount});
            var NemesisSTokensAmount = await NemesisSTContract.methods.balanceOf(userAccount).call({from:userAccount});
            await NemesisStakingContract.methods.unstake(NemesisSTokensAmount, true).send({from:userAccount});

            var NemesisTokensAmount = await NemesisContract.methods.balanceOf(userAccount).call({from:userAccount});
            await swapTokens(NemesisTokensAmount, NemesisAddress, BUSDAddress);
        }
    }

    setTimeout(checkNemesis, 1000);
}


async function checkJade() {
    BUSDAmount = await BUSDContract.methods.balanceOf(userAccount).call( {from:userAccount} );

    var currentBlock;
    await web3js.eth.getBlockNumber().then( res => { 
        currentBlock = res;
    });

    var endBlockJade;
    await JadeStakingContract.methods.epoch().call({from:userAccount}).then(res => {
        endBlockJade = res.endBlock;
    });

    var leftBlocksJade = endBlockJade - currentBlock;

    if (leftBlocksJade < 20) {
        if (BUSDAmount > 0) {
            await swapTokens(BUSDAmount, BUSDAddress, JadeAddress);

            var JadeTokensAmount = await JadeContract.methods.balanceOf(userAccount).call({from:userAccount});
            await JadeStakeFunctionContract.methods.stake(JadeTokensAmount).send( {from:userAccount} );

            while (leftBlocksJade > 0) {
                await web3js.eth.getBlockNumber().then( res => { 
                    currentBlock = res;
                });

                leftBlocksJade = endBlockJade - currentBlock;
            }

            await JadeStakingContract.methods.claim(userAccount).send({from:userAccount});
            var JadeSTokensAmount = await JadeSTContract.methods.balanceOf(userAccount).call({from:userAccount});
            await JadeStakingContract.methods.unstake(JadeSTokensAmount, true).send({from:userAccount});

            var JadeTokensAmount = await JadeConstract.methods.balanceOf(userAccount).call({from:userAccount});
            await swapTokens(JadeTokensAmount, JadeAddress, BUSDAddress);
        }
    }

    setTimeout(checkJade, 1000);
}

async function checkBlocks() {
    var currentBlock;
    await web3js.eth.getBlockNumber().then( res => { 
        currentBlock = res;
    });

    var endBlockJade;
    await JadeStakingContract.methods.epoch().call({from:userAccount}).then(res => {
        endBlockJade = res.endBlock;
    });

    var leftBlocksJade = endBlockJade - currentBlock;

    var endBlockNemesis;
    await NemesisStakingContract.methods.epoch().call({from:userAccount}).then(res => {
        endBlockNemesis = res.endBlock;
    });

    var leftBlocksNemesis = endBlockNemesis - currentBlock;

    console.log("/------------------/")
    console.log("Nemesis Left Blocks: " + leftBlocksNemesis);
    console.log("Est. Time for Rebase Nemesis: " + (leftBlocksNemesis * 3 / 3600) + " Hours");
    console.log("/------------------/")
    console.log("Jade Left Blocks: " + leftBlocksJade);
    console.log("Est. Time for Rebase Jade: " + (leftBlocksJade * 3 / 3600) + " Hours");
    console.log("/------------------/")

    setTimeout(checkBlocks, 5000);
}


async function swapTokens(amount, token1, token2) {
    await UniswapV2Router02Contract.methods.swapExactTokensForTokens(amount, 0, [token1, token2], userAccount, Date.now() + 1000).send( {from:userAccount} );
}
