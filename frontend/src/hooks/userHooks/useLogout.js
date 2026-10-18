import {useMutation,useQueryClient} from '@tanstack/react-query'
import {logoutUser} from '../../services/userService'
export default function useLogout(){
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:logoutUser,
        onSuccess:()=>{
            queryClient.setQueryData(["currentUser"],null)
        }
    })
}