import {useQueryClient,useMutation} from '@tanstack/react-query'
import {deleteAllExpenses} from '../../services/expenseService'
export default function useDeleteAllExpenses(){
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:deleteAllExpenses,
        onMutate:async ()=>{
            await queryClient.cancelQueries({queryKey:['expenses']})
            const prevData=queryClient.getQueryData(['expenses']);
            queryClient.setQueryData(['expenses'],[]);
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