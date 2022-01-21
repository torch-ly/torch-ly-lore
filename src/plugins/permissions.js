import store from "@/store";

export function canWrite(permissions) {
    if (permissions[0] === 'true') {
        return true;
    }

    return permissions.includes(store.state.user?.uid);

}
