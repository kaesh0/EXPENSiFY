import {useQuery} from '@tanstack/react-query'
import {getUserExpenses} from '../../services/expenseService.js'
export default function useExpenses(){
    return useQuery({
        queryKey:["expenses"],
        queryFn:getUserExpenses
    });
}