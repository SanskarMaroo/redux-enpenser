import React from 'react'
import { useSelector } from 'react-redux'
import './expenselist.css'
import Card from './Card';
import { toast, ToastContainer } from 'react-toastify';

const ExpenseList = () => {

  const { expenseList: list, query } = useSelector((state) => state.expenses);
  const updatedList = list.filter(
    (item) => {
      return item.title.includes(query);
    }
  );
  const notifySuccess = () => toast.success("Expense deleted.");

  return (
    <div className='expense-list'>
      <ToastContainer
        position="bottom-left"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
      {updatedList.length ? (
        updatedList.map((item) => <Card item={item} notifySuccess={notifySuccess} />)
      ) : (
        <div className='empty-state'>
          <img
            src={require("../../assets/images/empty.png")}
            alt='Empty List'
            className='empty-image'
          />
          <label>Uh Oh! Your expense list is empty</label>
        </div>
      )}
    </div>
  )
}

export default ExpenseList