import Followers from "../../components/Followers/Followers";
import Following from "../../components/Following/Following";
import Threads from "../../components/Threads/Threads";

export const profileContent = [
    {
        id: 1,
        element : <Threads />
    },
    {
        id: 2,
        element : <Followers />
    },
    {
        id: 3,
        element : <Following />
    }
    ];