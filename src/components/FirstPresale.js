import React, { Component } from 'react'
import './App.css'
import Web3 from 'web3'
import first_Presale from '../abis/FirstPresale.json'
import { Icon } from 'semantic-ui-react'
import CRWLogo from '../assets/images/CRW.png'
import CRWFavicon50 from '../assets/images/pequeño2.png'
import bnb from '../assets/images/bnb.png'
import 'animate.css';
//import BigNumber from 'bignumber.js'
import './App.css';

class Loteria extends Component {

    async componentWillMount() {
        // 1. Carga de Web3
        await this.loadWeb3()
        // 2. Carga de datos de la Blockchain
        await this.loadBlockchainData()
    }

    // 1. Carga de Web3
    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }

        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('¡No hay ningún navegador detectado. Deberías considerar usar Metamask!')
        }

    }

    // 2. Carga de datos de la Blockchain
    async loadBlockchainData() {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        console.log('Account:', this.state.account)
        const networkId = '3' //TODO Ganache -> 5777, Rinkeby -> 4, BSC -> 97 , BSC MAINET 56, Ropsten -> 3
        console.log('networkid:', networkId)
        const networkData = first_Presale.networks[networkId]
        console.log('NetworkData:', networkData)

        if (networkData) {
            const abi = first_Presale.abi
            console.log('abi', abi)
            const address = networkData.address
            console.log('address:', address)
            const contract = new web3.eth.Contract(abi, address)
            this.setState({ contract })
        } else {
            window.alert('¡El Smart Contract no se ha desplegado en la red!')
        }
    }

    // Constructor
    constructor(props) {
        super(props)
        this.state = {
            contract: null,
            loading: false,
            errorMessage: "",
            account: ""
        }
    }

    //TODO Función para visualizar cuanto TazerlingSwap se ha comprado
    /*
    TazerlingSwap_comprado = async (mensaje) => {
       try {
           console.log(mensaje)
           const bote_loteria = await this.state.contract.methods.TazerlingSwap_comprado().call()
           alert(parseFloat(bote_loteria))
       }catch(err){
           this.setState({errorMessage: err.message})
       } finally {
           this.setState({loading:false})
       }
    }
    */    

    _invest = async (mensaje) => {
        try {
            console.log(mensaje)
            const web3 = window.web3
            const accounts = await web3.eth.getAccounts()
            /*alert('¡Mucha suerte! ' + accounts[0])*/
            await this.state.contract.methods.invest().send({ from: accounts[0], value: 100000000000000000})
        } catch (err) {
            this.setState({ errorMessage: err.message })
        } finally {
            this.setState({ loading: false })
        }
    }

    _claimTokens = async (mensaje) => {
        try {
            console.log(mensaje)
            const web3 = window.web3
            const accounts = await web3.eth.getAccounts()
            /* alert('¡Mucha suerte! ' + accounts[0]) */
            await this.state.contract.methods.claimTokens().send({ from: accounts[0] })
        } catch (err) {
            this.setState({ errorMessage: err.message })
        } finally {
            this.setState({ loading: false })
        }
    }

    // Render de la DApp
    render() {
        return (
            <div>
                <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-2 shadow">
                    <a
                        className="navbar-brand col-sm-3 col-md-2 mr-0"
                        href=""
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    Zorzal -  Presale Private
                    </a>

                    <ul className="navbar-nav px-3">
                        <li className="navbar-brand col-sm-3 col-md-2 mr-0">
                            <small className="text-white"><span id="account">Wallet {this.state.account}</span></small>
                        </li>
                    </ul>

                </nav>
                <div className="container-fluid mt-5">
                    <div className="row">
                        <main role="main" className="col-lg-12 d-flex text-center">
                            <div className="content mr-auto ml-auto">

                                <a /* href="" */
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <p> </p>
                                    <img className="animate__animated animate__backInDown" style={{ height: '500px', width: '800px' }} src={CRWLogo} alt="CryptoRocketWar logo" />
                                </a>
                                <p> </p>
                                <h3>Token Address  0x30c02cf25F11c2954921a3326A7C3a361859568E</h3>
                                <h3> <img style={{ height: '50px', width: '50px', marginRight: '30px' }} src={bnb} alt="bnb logo" />Invest with BNB</h3>

                                <form onSubmit={(event) => {
                                    event.preventDefault()
                                    const mensaje = "Comprando con BNB..."
                                    this._invest(mensaje)
                                }
                                }>                                   

                                    <input type="submit"
                                        className='bbtn btn-block btn-negative btn-sm'
                                        value='BUY 0.1 BNB' />

                                    <br />
                                </form>

                                <h3> <img style={{ height: '50px', width: '50px', marginRight: '30px' }} src={CRWFavicon50} alt="CRW logo" /> Claim $ZORZAL</h3>

                                <form onSubmit={(event) => {
                                    event.preventDefault()
                                    const mensaje = "claimeando ZORZALs..."
                                    this._claimTokens(mensaje)
                                }
                                }>
                                    <input type="submit"
                                        className='bbtn btn-block btn-negative btn-sm'
                                        value='CLAIM' />
                                </form>

                                <br/>
                                <br/>
                            </div>
                        </main>
                    </div>
                </div>
            </div>




        )
    }


}

export default Loteria