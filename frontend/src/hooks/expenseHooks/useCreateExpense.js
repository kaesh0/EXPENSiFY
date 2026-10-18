import {useMutation,useQueryClient} from '@tanstack/react-query'
import {addUserExpense} from '../../services/expenseService'
export default function useCreateExpense(){
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:addUserExpense,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['expenses']})
        }
    })
}