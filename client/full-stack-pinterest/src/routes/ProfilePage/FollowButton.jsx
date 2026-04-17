import { useQueryClient, useMutation } from "@tanstack/react-query";
import request from "../../utils/request";

function FollowButton({ isFollowing, username }) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        // 突变操作
        mutationFn: async (username) => {
            const res = await request.post(`/users/follow/${username}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user", username] });

        },
    });
    return (
        <button onClick={() => mutation.mutate(username)} disabled={mutation.isPending}>
            {isFollowing ? '取消关注' : '关注'}
        </button>
    );
}

export default FollowButton;