import React from 'react';
import { Header } from './components/Header.jsx'
import { Balance } from './components/container/Balance.jsx';
import { IncomeExpenses } from './components/container/IncomeExpenses.jsx';
import { TransactionList } from './components/container/TransactionList.jsx';
import { AddTransaction } from './components/container/AddTransaction.jsx';
import { GlobalProvider } from './context/GlobalState.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
        <GlobalProvider>
          <Header/>
          <div>
            <Balance/>
        <IncomeExpenses/>
        <TransactionList/>
        <AddTransaction/>
        </div>
      </GlobalProvider>
   
  );
};

export default App;