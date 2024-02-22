require("dotenv").config();
const { ethers } = require("ethers");

const ABI = require("./erc20.abi.json");
const contractAddress = "0x4EAD784006Cb920965CB1B45A9F6923330A3Ccf0";
const provider = new ethers.InfuraProvider("sepolia");
const contractReadMode = new ethers.Contract(contractAddress, ABI, provider);

async function getRandomWallet() {
  console.log("Gerando uma nova carteira...");
  const wallet = ethers.Wallet.createRandom()
  const walletResp = {
      mnemonic: wallet.mnemonic.phrase,
      address: wallet.address,
      privateKey: wallet.privateKey
  }
  console.log(walletResp)
  return walletResp
}

async function getBalance(contaCliente) {
  const saldo = await contractReadMode.balanceOf(contaCliente);
  console.log("Saldo do cliente: ", contaCliente, "é", saldo);
}

async function getNomeToken() {
  const nome = await contractReadMode.name();
  console.log("Nome do Token é: ", nome);
}


async function main() {
  try {
    await getNomeToken();
    await getBalance("0x263C3Ab7E4832eDF623fBdD66ACee71c028Ff591"); 
    console.log("chamando getRandomWallet...");
    const randomWallet = await getRandomWallet();
    console.log("Carteira gerada...", randomWallet.address);
    await getBalance(randomWallet.address); 
  } catch (error) {
    console.log('Erro no processamento: ', error );
  }
}

main().then( () => process.exit(0) )