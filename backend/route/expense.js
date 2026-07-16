const express=require('express');
const router=express.Router();
const {handleAddUserExpense,handleEditUserExpense,handleGetEditUserExpense,handleShowUserExpense,handleDeleteExpenseAll,handleDeleteExpenseById}=require('../controller/expense')
const {handleDashBoard}=require('../controller/dashboard')
router.get('/',handleShowUserExpense);
router.get('/dashboard',handleDashBoard)
router.get('/:id',handleGetEditUserExpense);
router.post('/',handleAddUserExpense);
router.put('/:id',handleEditUserExpense);
router.delete('/',handleDeleteExpenseAll);
router.delete('/:id',handleDeleteExpenseById)
module.exports=router;