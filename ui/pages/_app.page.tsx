
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import '../styles/globals.css'
import { useEffect, useState, useRef} from "react";
import './reactCOIServiceWorker';
import ZkappWorkerClient from './zkappWorkerClient';

import {
  PublicKey,
  PrivateKey,
  Field,
} from 'snarkyjs'

let transactionFee = 0.1;

export default function App() {

  let [state, setState] = useState({
    zkappWorkerClient: null as null | ZkappWorkerClient,
    hasWallet: null as null | boolean,
    hasBeenSetup: false,
    accountExists: false,
    currentNum: null as null | Field,
    publicKey: null as null | PublicKey,
    zkappPublicKey: null as null | PublicKey,
    creatingTransaction: false,
  });

// --------------------------------------------------------
// Status

  const status1 = () => {
    const el = document.getElementById("status1")!
	el.style.display = "block";
	const el2 = document.getElementById("status2")!
	el2.style.display = "none";
	const el3 = document.getElementById("status3")!
	el3.style.display = "none";
	const el4 = document.getElementById("status4")!
	el4.style.display = "none";
	const el5 = document.getElementById("status5")!
	el5.style.display = "none";
	const el6 = document.getElementById("status6")!
	el6.style.display = "none";
  }
  
   const status2 = () => {
    const el = document.getElementById("status1")!
	el.style.display = "none";
	const el2 = document.getElementById("status2")!
	el2.style.display = "block";
	const el3 = document.getElementById("status3")!
	el3.style.display = "none";
	const el4 = document.getElementById("status4")!
	el4.style.display = "none";
	const el5 = document.getElementById("status5")!
	el5.style.display = "none";
	const el6 = document.getElementById("status6")!
	el6.style.display = "none";
  }
  
   const status3 = () => {
    const el = document.getElementById("status1")!
	el.style.display = "none";
	const el2 = document.getElementById("status2")!
	el2.style.display = "none";
	const el3 = document.getElementById("status3")!
	el3.style.display = "block";
	const el4 = document.getElementById("status4")!
	el4.style.display = "none";
	const el5 = document.getElementById("status5")!
	el5.style.display = "none";
	const el6 = document.getElementById("status6")!
	el6.style.display = "none";
  }
  
   const status4 = () => {
    const el = document.getElementById("status1")!
	el.style.display = "none";
	const el2 = document.getElementById("status2")!
	el2.style.display = "none";
	const el3 = document.getElementById("status3")!
	el3.style.display = "none";
	const el4 = document.getElementById("status4")!
	el4.style.display = "block";
	const el5 = document.getElementById("status5")!
	el5.style.display = "none";
	const el6 = document.getElementById("status6")!
	el6.style.display = "none";
  }
  
   const status5 = () => {
    const el = document.getElementById("status1")!
	el.style.display = "none";
	const el2 = document.getElementById("status2")!
	el2.style.display = "none";
	const el3 = document.getElementById("status3")!
	el3.style.display = "none";
	const el4 = document.getElementById("status4")!
	el4.style.display = "none";
	const el5 = document.getElementById("status5")!
	el5.style.display = "block";
	const el6 = document.getElementById("status6")!
	el6.style.display = "none";
  }
  
   const status6 = () => {
    const el = document.getElementById("status1")!
	el.style.display = "none";
	const el2 = document.getElementById("status2")!
	el2.style.display = "none";
	const el3 = document.getElementById("status3")!
	el3.style.display = "none";
	const el4 = document.getElementById("status4")!
	el4.style.display = "none";
	const el5 = document.getElementById("status5")!
	el5.style.display = "none";
	const el6 = document.getElementById("status6")!
	el6.style.display = "block";
  }
  
   const send1 = () => {
    const el = document.getElementById("send1")!
	el.style.display = "block";
	const el2 = document.getElementById("send2")!
	el2.style.display = "none";
	const el3 = document.getElementById("send3")!
	el3.style.display = "none";
	const el4 = document.getElementById("send4")!
	el4.style.display = "none";
  }
  
  const send2 = () => {
    const el = document.getElementById("send1")!
	el.style.display = "none";
	const el2 = document.getElementById("send2")!
	el2.style.display = "block";
	const el3 = document.getElementById("send3")!
	el3.style.display = "none";
	const el4 = document.getElementById("send4")!
	el4.style.display = "none";
  }
  
  const send3 = () => {
    const el = document.getElementById("send1")!
	el.style.display = "none";
	const el2 = document.getElementById("send2")!
	el2.style.display = "none";
	const el3 = document.getElementById("send3")!
	el3.style.display = "block";
	const el4 = document.getElementById("send4")!
	el4.style.display = "none";
  }
  
  const send4 = () => {
    const el = document.getElementById("send1")!
	el.style.display = "none";
	const el2 = document.getElementById("send2")!
	el2.style.display = "none";
	const el3 = document.getElementById("send3")!
	el3.style.display = "none";
	const el4 = document.getElementById("send4")!
	el4.style.display = "block";
  }
  
  const donesend = () => {
    const el = document.getElementById("send1")!
	el.style.display = "none";
	const el2 = document.getElementById("send2")!
	el2.style.display = "none";
	const el3 = document.getElementById("send3")!
	el3.style.display = "none";
	const el4 = document.getElementById("send4")!
	el4.style.display = "none";
	const el5 = document.getElementById("sendLoading")!
	el5.style.display = "none";
	const el6 = document.getElementById("sendDone")!
	el6.style.display = "block";
	const el7 = document.getElementById("sendCheck")!
	el7.style.display = "block";
	const el8 = document.getElementById("closeSend")!
	el8.style.display = "block";
  }
	
  // -------------------------------------------------------
  // Do Setup
  const connectWallet = async () => {
      if (!state.hasBeenSetup) {
        const zkappWorkerClient = new ZkappWorkerClient();
        
        console.log('Loading SnarkyJS...');
		status1();
        await zkappWorkerClient.loadSnarkyJS();
        console.log('done');

        await zkappWorkerClient.setActiveInstanceToBerkeley();

        const mina = (window as any).mina;
		status2();

        if (mina == null) {
          setState({ ...state, hasWallet: false });
		  return;
        }

        const publicKeyBase58 : string = (await mina.requestAccounts())[0];
        const publicKey = PublicKey.fromBase58(publicKeyBase58);

        console.log('using key', publicKey.toBase58());

        console.log('checking if account exists...');
        const res = await zkappWorkerClient.fetchAccount({ publicKey: publicKey! });
        const accountExists = res.error == null;

        await zkappWorkerClient.loadContract();

        console.log('compiling zkApp');
		status3();
        await zkappWorkerClient.compileContract();
        console.log('zkApp compiled');

        const zkappPublicKey = PublicKey.fromBase58('B62qrDe16LotjQhPRMwG12xZ8Yf5ES8ehNzZ25toJV28tE9FmeGq23A');

        await zkappWorkerClient.initZkappInstance(zkappPublicKey);

        console.log('getting zkApp state...');
        await zkappWorkerClient.fetchAccount({ publicKey: zkappPublicKey })
        const currentNum = await zkappWorkerClient.getNum();
        console.log('current state:', currentNum.toString());

        setState({ 
            ...state, 
            zkappWorkerClient, 
            hasWallet: true,
            hasBeenSetup: true, 
            publicKey, 
            zkappPublicKey, 
            accountExists, 
            currentNum
        });
      }
  };

  // -------------------------------------------------------
  // Newwwwww
  const connectBtnclick = () => {
    const el = document.getElementById("loadingBtn")!
	el.style.display = "block";
	const el2 = document.getElementById("connectBtn")!
	el2.style.display = "none";
	const el3 = document.getElementById("loading")!
	el3.style.display = "block";
	const el4 = document.getElementById("banner")!
	el4.style.display = "none";
	const el5 = document.getElementById("banner2")!
	el5.style.display = "none";
  };
  
  const hideloadingBtn = () => {
    const el = document.getElementById("loadingBtn")!
	el.style.display = "none";
	const el2 = document.getElementById("loading")!
	el2.style.display = "none";
	const el3 = document.getElementById("succes")!
	el3.style.display = "block";
  };
  
  const closeGetclick = () => {
    const el = document.getElementById("getscreen")!
	el.style.display = "none";
	const el2 = document.getElementById("getBtnDisable")!
	el2.style.display = "none";
	const el3 = document.getElementById("getBtn")!
	el3.style.display = "block";
	const el4 = document.getElementById("sendBtnDisable")!
	el4.style.display = "none";
	const el5 = document.getElementById("sendBtn")!
	el5.style.display = "block";
  };
  
  const closeSendclick = () => {
    const el = document.getElementById("sendscreen")!
	el.style.display = "none";
	const el2 = document.getElementById("sendBtnDisable")!
	el2.style.display = "none";
	const el3 = document.getElementById("sendBtn")!
	el3.style.display = "block";
	const el4 = document.getElementById("getBtnDisable")!
	el4.style.display = "none";
	const el5 = document.getElementById("getBtn")!
	el5.style.display = "block";
	const el6 = document.getElementById("sendDone")!
	el6.style.display = "none";
    const el7 = document.getElementById("sendCheck")!
	el7.style.display = "none";
    const el8 = document.getElementById("closeSend")!
	el8.style.display = "none";
  };
  
  const getscreenShow = () => {
	const el = document.getElementById("getscreen")!
	el.style.display = "block";
	const el2 = document.getElementById("getBtn")!
	el2.style.display = "none";
	const el3 = document.getElementById("getBtnDisable")!
	el3.style.display = "block";
	const el4 = document.getElementById("sendBtnDisable")!
	el4.style.display = "block";
	const el5 = document.getElementById("sendBtn")!
	el5.style.display = "none";
  };
  
  const sendscreenShow = () => {
	const el = document.getElementById("sendscreen")!
	el.style.display = "block";
	const el2 = document.getElementById("sendBtn")!
	el2.style.display = "none";
	const el3 = document.getElementById("sendBtnDisable")!
	el3.style.display = "block";
	const el4 = document.getElementById("getBtnDisable")!
	el4.style.display = "block";
	const el5 = document.getElementById("getBtn")!
	el5.style.display = "none";
    const el6 = document.getElementById("sendLoading")!
	el6.style.display = "block";
  };
  
  const noAccount = () => {
    const el = document.getElementById("loadingBtn")!
	el.style.display = "none";
    const el2 = document.getElementById("caution")!
	el2.style.display = "block";
    const el3 = document.getElementById("ftxt")!
	el3.style.display = "block";
	const el4 = document.getElementById("backNoAccount")!
	el4.style.display = "block";
    const el5 = document.getElementById("loading")!
	el5.style.display = "none";
  }
  
  const backNoAccountClick = () => {
    location.reload();
  }
  
  const backNoWalletClick = () => {
    location.reload();;
  }
  
  const noWallet = () => {
    const el = document.getElementById("loadingBtn")!
	el.style.display = "none";
    const el2 = document.getElementById("caution")!
	el2.style.display = "block";
    const el3 = document.getElementById("walletTxt")!
	el3.style.display = "block";
	const el4 = document.getElementById("backNoWallet")!
	el4.style.display = "block";
    const el5 = document.getElementById("loading")!
	el5.style.display = "none";
  }
  
  const getload = () => {
    const el = document.getElementById("getLoading")!
	el.style.display = "block";
	const el2 = document.getElementById("gettext")!
	el2.style.display = "none";
	const el3 = document.getElementById("getnumber")!
	el3.style.display = "none";
  }
  
  const getdone = () => {
    const el = document.getElementById("getLoading")!
	el.style.display = "none";
	const el2 = document.getElementById("gettext")!
	el2.style.display = "block";
	const el3 = document.getElementById("getnumber")!
	el3.style.display = "block";
  }
  // -------------------------------------------------------
 
   // -------------------------------------------------------
  // Send a transaction

  const onSendTransaction = async () => {
    setState({ ...state, creatingTransaction: true });
	send1();
    console.log('sending a transaction...');

    await state.zkappWorkerClient!.fetchAccount({ publicKey: state.publicKey! });

    await state.zkappWorkerClient!.createUpdateTransaction();

    console.log('creating proof...');
	send2();
    await state.zkappWorkerClient!.proveUpdateTransaction();

    console.log('getting Transaction JSON...');
	send3();
    const transactionJSON = await state.zkappWorkerClient!.getTransactionJSON()

    console.log('requesting send transaction...');
	send4();
    const { hash } = await (window as any).mina.sendTransaction({
      transaction: transactionJSON,
      feePayer: {
        fee: transactionFee,
        memo: '',
      },
    });

    console.log(
      'See transaction at https://berkeley.minaexplorer.com/transaction/' + hash
    );

	donesend();

    setState({ ...state, creatingTransaction: false });
  }
  
   // -------------------------------------------------------
  // Refresh the current state

  const onRefreshCurrentNum = async () => {
    console.log('getting zkApp state...');
	getload();
    await state.zkappWorkerClient!.fetchAccount({ publicKey: state.zkappPublicKey! })
    const currentNum = await state.zkappWorkerClient!.getNum();
    console.log('current state:', currentNum.toString());
	getdone();

    setState({ ...state, currentNum });
  }
 
  let hasWallet;
  if (state.hasWallet != null && !state.hasWallet) {
    const auroLink = 'https://www.aurowallet.com/';
    hasWallet = <a id="walletLink" style={{display: 'block'}} href={auroLink} target="_blank" rel="noreferrer">
		<h1 className={styles.walletLink}>[[CLICK HERE]]</h1>
	</a>
	status4();
	noWallet();

  }

  let setupText = state.hasBeenSetup ? 'SnarkyJS Ready' : 'Loading...';
  let setup = <div id="setup" style={{display: 'block'}}> { setupText } { hasWallet }</div>
  
  let accountDoesNotExist;
  if (state.hasBeenSetup && !state.accountExists) {
	  const faucetLink = "https://faucet.minaprotocol.com/?address=" + state.publicKey!.toBase58();
	accountDoesNotExist = <a id="flink" style={{display: 'block'}} href={faucetLink} target="_blank" rel="noreferrer">
		<h1 className={styles.faucetHere}>[[CLICK HERE]]</h1>
	</a>
	status5();
	noAccount();
	hasBeenSetup: false;
  }
  
  let mainContent;
  if (state.hasBeenSetup && state.accountExists) {	
    mainContent =
		<div>
			<a id="sendBtn" style={{display: 'block'}} onClick={() => {onSendTransaction(); sendscreenShow(); }}>
					<span className={styles.sendBtn}> </span>
			</a>
			
			<a id="getBtn" style={{display: 'block'}} onClick={() => {onRefreshCurrentNum(); getscreenShow(); }}>
					<span className={styles.getBtn}></span>
			</a>
			
			<span id="getBtnDisable" style={{display: 'none'}} className={styles.getBtnDisable}></span>
			<span id="sendBtnDisable" style={{display: 'none'}} className={styles.sendBtnDisable}></span>
			
			<h1 className={styles.txtAddrs}>{  state.publicKey!.toBase58() } </h1>
			<h1 className={styles.addrs}>Address :</h1>
			
			<div id="getscreen" style={{display: 'none'}} className={styles.getscreen}>
				<span className={styles.getscreenBlack}> </span>
				<span className={styles.getscreenImg}> </span>
				
				<a id="closeGet" style={{display: 'block'}} onClick={() => {closeGetclick(); }}>
					<span className={styles.closeGet}> </span>
				</a>
				
				<span id="getLoading" style={{display: 'none'}} className={styles.getLoading}> </span>
				
				<h1 id="gettext" style={{display: 'none'}} className={styles.txtState}>Current Number in ZkApp :</h1>
				<h1 id="getnumber" style={{display: 'none'}} className={styles.numState}>{ state.currentNum!.toString() } </h1>
			</div>
			
			<div id="sendscreen" style={{display: 'none'}} className={styles.sendscreen}>
				<span className={styles.sendscreenBlack}> </span>
				<span className={styles.sendscreenImg}> </span>
				
				<a id="closeSend" style={{display: 'none'}} onClick={() => {closeSendclick(); }}>
					<span className={styles.closeSend}> </span>
				</a>
				
				<span id="sendLoading" style={{display: 'none'}} className={styles.sendLoading}> </span>
				<span id="sendCheck" style={{display: 'none'}} className={styles.sendCheck}> </span>
				<span id="sendDone" style={{display: 'none'}} className={styles.sendDone}> </span>
				
				<h1 id="send1" style={{display: 'none'}} className={styles.statusSendTxt}>Sending a Transaction...</h1>
				<h1 id="send2" style={{display: 'none'}} className={styles.statusSendTxt}>Creating Proof...</h1>
				<h1 id="send3" style={{display: 'none'}} className={styles.statusSendTxt}>Getting Transaction JSON...</h1>
				<h1 id="send4" style={{display: 'none'}} className={styles.statusSendTxt}>Requesting Send Transaction...</h1>


			</div>

		</div>
	hideloadingBtn();
	status6();
  }
	
  return (
	<div className={styles.container}>	
	  <Head>
        <title>zkApp [achdy]</title>
        <meta name="description" content="ZkApp By achdy" />
		<meta name="viewport" content="width=1024"/>
        <link href="data:image/png;base64,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" rel="icon" type="image/x-icon" />
	  </Head>
	  
		<main className={styles.main}>
		
			<div id="homepage" className={styles.homepage}>
				<span className={styles.homepageImg}> </span>
				<a id="connectBtn" style={{display: 'block'}} onClick={() => {connectBtnclick(); connectWallet();}}>
					<span className={styles.connectBtn}> </span>
				</a>
				
					<span id="loadingBtn" style={{display: 'none'}} className={styles.loadingBtn}> </span>
					<span id="loading" style={{display: 'none'}} className={styles.loading}> </span>
					
					<h1 id="status1" style={{display: 'none'}} className={styles.statusTxt}>Status : Sync & Checking Wallet ...</h1>
					<h1 id="status2" style={{display: 'none'}} className={styles.statusTxt}>Status : Sync DONE! Connect to Wallet...</h1>
					<h1 id="status3" style={{display: 'none'}} className={styles.statusTxt}>Status : Checking & Validation Address...</h1>
					<h1 id="status4" style={{display: 'none'}} className={styles.statusTxt}>Status : Wallet Extension Not Found!</h1>
					<h1 id="status5" style={{display: 'none'}} className={styles.statusTxt}>Status : Address Not Valid or No Balance!</h1>
					<h1 id="status6" style={{display: 'none'}} className={styles.statusTxt}>Status : READY FOR TRANSACTION!!!</h1>
					
					<span id="caution" style={{display: 'none'}} className={styles.caution}> </span>
					
					<span id="succes" style={{display: 'none'}} className={styles.succes}> </span>

					<h1 id="ftxt" style={{display: 'none'}} className={styles.faucetTxt}>Invalid Account or No Balance!! Please check and fund on this link </h1>
					
					<h1 id="walletTxt" style={{display: 'none'}} className={styles.walletTxt}>Could not find a wallet. Please Install Auro wallet and Re-Connect!! </h1>
					
					<a id="backNoAccount" style={{display: 'none'}} onClick={() => {backNoAccountClick(); }}>
						<span className={styles.backNoAccount}> </span>
					</a>
					
					<a id="backNoWallet" style={{display: 'none'}} onClick={() => {backNoWalletClick(); }}>
						<span className={styles.backNoWallet}> </span>
					</a>
					
					<span id="banner" style={{display: 'block'}} className={styles.banner}> </span>
					<span id="banner2" style={{display: 'block'}} className={styles.banner2}> </span>
					
				{mainContent}
				{accountDoesNotExist}
				{hasWallet}
				
			<div id="footer" style={{display: 'block'}} >	
				<span id="footerbg" style={{display: 'block'}} className={styles.footerbg}> </span>
				<a style={{display: 'block'}} href="https://t.me/achdy" target="_blank" rel="noopener noreferrer" >
						<span className={styles.teleIcon}> </span>
					</a>
					
				<a style={{display: 'block'}} href="https://discordapp.com/users/445412414884675604" target="_blank" rel="noopener noreferrer" >
						<span className={styles.dcIcon}> </span>
					</a>
					
				<a style={{display: 'block'}} href="https://github.com/achdy" target="_blank" rel="noopener noreferrer" >
						<span className={styles.gitIcon}> </span>
					</a>
					
					
				<span id="blank" style={{visibility: 'hidden'}} className={styles.blank}> </span>
			</div>
					
			</div>
		</main>
		
	<footer className={styles.footer}>
		</footer>


	</div>
  );
}
