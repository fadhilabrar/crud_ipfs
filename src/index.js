import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import Web3 from 'web3';
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard";
import CreateLayout from "./layouts/create";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";
import Files from '../build/contracts/Files.json'

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contract: null,
      web3: null,
      account: null
    }
  }

  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider.enable())
    }
    else {
      window.alert("Silahkan gunakan metamask");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    console.log(accounts[0]);
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Files.networks[networkId]
    if(networkData) {
      const contract = new web3.eth.Contract(Files.abi, networkData.address)
      this.setState({ contract })
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  render() {
    return (
      <ChakraProvider theme={theme}>
        <React.StrictMode>
          <HashRouter>
            <Switch>
              <Route path={`/dashboard`} component={props => <DashboardLayout contracts={this.state.contract} accounts={this.state.account}/>} />
              <Route path={`/create`} component={props => <CreateLayout contracts={this.state.contract} accounts={this.state.account}/>} />
              <Redirect from='/' to='/dashboard' />
            </Switch>
          </HashRouter>
        </React.StrictMode>
      </ChakraProvider>);
  }
}

ReactDOM.render(
  <Index/>,
  document.getElementById("root")
);
