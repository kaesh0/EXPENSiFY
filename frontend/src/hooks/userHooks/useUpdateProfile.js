import {useMutation,useQueryClient} from '@tanstack/react-query'
import {updateProfile} from '../../services/userService'
export default function useUpdateProfile(){
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:({name})=>{return updateProfile(name)},
        onSuccess:(updatedUser)=>{
            queryClient.invalidateQueries({queryKey:['currentUser']})
        }
    })
}