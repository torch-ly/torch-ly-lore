import store from "@/store";

export function canWrite(permissions) {
    if (permissions.default > 1) {
        return true;
    }

    if (permissions.user > 1 && store.state.campaignData.users.includes(store.state.user?.uid)) {
        return true;
    }

    return permissions.write.includes(store.state.user?.uid);



}
