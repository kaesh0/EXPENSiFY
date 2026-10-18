import {useQueryClient,useMutation} from '@tanstack/react-query'
import {editUserExpense} from '../../services/expenseService'
function updateExpenseList(expenses=[],id,newData){
    return expenses.map((expense)=>expense._id===id?{...expense,...newData}:expense)
}
export default function useUpdateExpense(){
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:({id,newData})=>{return editUserExpense(id,newData)},
        onMutate:async ({id,newData})=>{
            await queryClient.cancelQueries({queryKey:['expenses']})
            const prevExpense=queryClient.getQueryData(['expenses']);
            queryClient.setQueryData(['expenses'],(oldExpenses)=>updateExpenseList(oldExpenses,id,newData))
            return {prevExpense}
        },
        onError:(error,data,context)=>{
            queryClient.setQueryData(['expenses'],context.prevExpense)
        },
        onSettled:()=>{
            queryClient.invalidateQueries({queryKey:['expenses']});
        }
    })
}