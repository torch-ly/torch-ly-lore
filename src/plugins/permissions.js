import store from "../store";

export function userPermission() {
    let perm = store.state.campaign.users.find((user) => {
        return user.object.id === store.state.user.uid
    });

    if (!perm) {
        return {name: "", root: "default"};
    } else {
        perm = perm.permission;
    }

    return store.state.campaign.permissions.find((permission) => {
        if (permission.name === perm) {
            return permission;
        }
    });
}

export function generatePermissionTree() {
    let tree = [];
    let subperm = userPermission();
    while (subperm && subperm.name !== 'default' && subperm.name !== 'gm') {
        tree.push(subperm.name)
        let newSubperm = store.state.campaign.permissions.find((perm) => perm.name === subperm.root)
        if (newSubperm) {
            subperm = newSubperm
        } else {
            break
        }
    }
    tree.push(subperm.name)

    return tree

}
