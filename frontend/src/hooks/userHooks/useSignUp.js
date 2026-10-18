import {useMutation,useQueryClient} from '@tanstack/react-query'
import {signUpUser} from '../../services/userService'
export default function useSignUp(){
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:signUpUser,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['currentUser']})
        }
    })
}