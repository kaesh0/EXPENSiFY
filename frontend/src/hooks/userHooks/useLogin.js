import {useMutation,useQueryClient} from '@tanstack/react-query'
import {loginUser} from '../../services/userService'
export default function useLogin(){
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:loginUser,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['currentUser']})
        }
    })
}