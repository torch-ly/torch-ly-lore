import store from "../store";

export function userPermission() {
    let perm = store.state.campaign.users.find((user) => {
        return user.object.id === store.state.user.uid
    });

    if (!perm) {
        return {name: "default", root: "none"};
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
    let subperm = store.state.userPermission;
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

export function hasFilePermission(filePermission) {

    let permission = {
        canView: false,
        canEdit: false,
        canChangePermissions: false,
    }

    if (store.state.userPermissionTree.includes("gm")) {
        permission.canView = true;
        permission.canEdit = true;
        permission.canChangePermissions = true;
        return;
    }

    for (let perm of store.state.userPermissionTree) {
        if (filePermission[perm] - 4 >= 0) {
            permission.canView = true;
        }
        if (filePermission[perm] - 4 - 2 >= 0) {
            permission.canEdit = true;
        }
        if (filePermission[perm] - 4 - 2 - 1 >= 0) {
            permission.canChangePermissions = true;
        }
    }

    return permission;
}
