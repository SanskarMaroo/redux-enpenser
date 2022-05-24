import React, { useState } from 'react'
import './addform.css'
import { categories } from '../../constants/add-expense-category';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SuccessModal from './SuccessModal';
import { useDispatch } from 'react-redux';
import { addExpense } from '../../redux/actions/expenses'

const AddForm = () => {

    const cat = categories;

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState();
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const dispatch = useDispatch();

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleAmount = (e) => {
        const val = parseFloat(e.target.value);

        if (isNaN(val)) {
            setAmount("");
            return;
        }

        setAmount(val);
    }

    const handleCategory = (category) => {
        setCategory(category);
        setCategoryOpen(false);
    }

    const handleSubmit = () => {
        if (title === '' || amount === '' || !category) {
            const notify = () => toast("Please enter all the fields!");
            notify();
        }
        else {
            const data = {
                title,
                amount,
                category,
                createdAt: new Date()
            };

            dispatch(addExpense(data));
            setModalOpen(true);
        }
    }

    return (
        <div className='add-form'>
            <ToastContainer
                position="bottom-left"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
            />

            <SuccessModal
                modalOpen={modalOpen}
            />

            <div className="form-item">
                <label>Title</label>
                <input
                    type="text"
                    placeholder='Enter your expenditure'
                    value={title}
                    onChange={handleTitle}
                />
            </div>
            <div className="form-item">
                <label>Amount ₹</label>
                <input
                    className='amount-input'
                    placeholder='Enter amount'
                    value={amount}
                    onChange={handleAmount}
                />
            </div>
            <div className="category-container-parent">
                <div className="category">
                    <div className="category-dropdown" onClick={() => setCategoryOpen(!categoryOpen)}>
                        <label>{category ? category.title : 'Category'}</label>
                        <i className="fi fi-rr-angle-down"></i>
                    </div>
                    {categoryOpen && (
                        <div className="category-container">
                            {cat.map((category) => (
                                <div
                                    className="category-item"
                                    style={{ borderRight: `5px solid ${category.color}` }}
                                    key={category.id}
                                    onClick={() => handleCategory(category)}
                                >
                                    <label>{category.title}</label>
                                    <img src={category.icon} alt={category.title} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="form-add-button">
                <div onClick={handleSubmit}>
                    <label>Add</label>
                    <i className="fi fi-rr-paper-plane"></i>
                </div>
            </div>
        </div>
    )
}

export default AddForm