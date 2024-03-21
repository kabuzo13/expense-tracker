import React from 'react';
import { Header } from './components/Header.jsx';
import { Balance } from './components/container/Balance.jsx';
import { IncomeExpenses } from './components/container/IncomeExpenses.jsx';
import { TransactionList } from './components/container/TransactionList.jsx';
import { AddTransaction } from './components/container/AddTransaction.jsx';
import { GlobalProvider } from './context/GlobalState.jsx';
import CategoryChart from './components/category-chart/categoryChart';
import BalanceIndicator from './components/balance indicator/balanceIndicator.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <GlobalProvider>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <div style={{ flex: 1, paddingRight: '20px' }}>
          <Header />
          <Balance />
          <IncomeExpenses />
          <TransactionList />
          <AddTransaction />
        </div>
        <div style={{ flex: 1, paddingLeft: '20px' }}>
          <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
            <BalanceIndicator />
          </div>
          <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <CategoryChart />
          </div>
        </div>
      </div>
    </GlobalProvider>
  );
};

export default App;
