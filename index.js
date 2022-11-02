import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")

const stakeButton30 = document.getElementById("stakeFor30")
const stakeButton90 = document.getElementById("stakeFor90")
const unstakeButton = document.getElementById("unstake")


unstakeButton.onclick = unstake 
stakeButton30.onclick = stake30
stakeButton90.onclick = stake90
connectButton.onclick = connect

console.log(ethers)
async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" })
      } catch (error) {
        console.log(error)
      }
      connectButton.innerHTML = "Connected"
      const accounts = await ethereum.request({ method: "eth_accounts" })
      console.log(accounts)
    } else {
      connectButton.innerHTML = "Please install MetaMask"
    }
  }


function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}...`)
    //listen for transaction to finish
    //Promise tells only finish this function once resolved
    return new Promise((resolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReciept) => {
            console.log(
                `Completed with ${transactionReciept.confirmations} confirmations`
            )
            resolve()
        })
    })
}

async function stake30() {
  const amount = 1*10e14
  
  const days = 30
    console.log(`Funding with ${amount}...`)
    if ((typeof window, ethereum !== "undefined")) {
        console.log("staking...")
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
          const transactionResponse = await contract.Staking(amount, days)
            await listenForTransactionMine(transactionResponse, provider)
            console.log("Done!")

        } catch (error) {
            console.log(error)
        }
        
    }
}

async function stake90() {
  const amount = 30
  
  const days = 90
    console.log(`Funding with ${amount}...`)
    if ((typeof window, ethereum !== "undefined")) {
        console.log("staking...")
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
          const transactionResponse = await contract.Staking(amount, days)
            await listenForTransactionMine(transactionResponse, provider)
            console.log("Done!")

        } catch (error) {
            console.log(error)
        }
        
    }
}


async function unstake() {
  if ((typeof window, ethereum !== "undefined")) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)
      try {
        const transactionResponse = await contract.UnStaking({
        },)
          await listenForTransactionMine(transactionResponse, provider)
          console.log("Done!")

      } catch (error) {
          console.log(error)
      }
      
  }
}
