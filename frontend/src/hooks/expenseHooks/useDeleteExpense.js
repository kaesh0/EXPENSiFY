import {useQueryClient,useMutation} from '@tanstack/react-query'
import {deleteExpense} from '../../services/expenseService'
function removeFromExpenseList(oldData=[],id){
    return oldData.filter((expense)=>{
        return expense._id!==id;
    })
}
export default function useDeleteExpense(){
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:({id})=>{return deleteExpense(id)},
        onMutate:async ({id})=>{
            await queryClient.cancelQueries({queryKey:['expenses']})
            const prevData=queryClient.getQueryData(['expenses']);
            queryClient.setQueryData(['expenses'],(oldData)=>removeFromExpenseList(oldData,id));
            return {prevData}
        },
        onError:(error,data,context)=>{
            queryClient.setQueryData(['expenses'],context.prevData);
        },
        onSettled:()=>{
            queryClient.invalidateQueries({queryKey:['expenses']})
        }
    })
}