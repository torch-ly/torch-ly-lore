import {doc, updateDoc} from "firebase/firestore";
import {db} from "@/plugins/firebase";
import store from "@/store";

export class Npc {
    constructor (name, alive, description, quickinfo, id, permissionWrite, permissionRead) {
        this.name = name;
        this.alive = alive;
        this.description = description;
        this.quickinfo = quickinfo;
        this._id = id;
        this.permissionWrite = permissionWrite;
        this.permissionRead = permissionRead;
    }
    ref() {
        return doc(db, 'campaigns', store.state.campaign, 'npcs', this._id).withConverter(npcConverter);
    }
    getRoute() {
        return "/w/" + store.state.campaign + "/npc/" + this._id;
    }
    async push() {
        await updateDoc(this.ref(), this);
    }
}

// Firestore data converter
export const npcConverter = {
    toFirestore: (npc) => {
        return {
            alive: this.alive,
            name: this.name,
            description: this.description,
            quickinfo: this.quickinfo,
            permissionWrite: this.permissionWrite,
            permissionRead: this.permissionRead
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Npc(data.name, data.alive, data.description, data.quickinfo, snapshot.id, data.permissionWrite, data.permissionRead);
    }
};
