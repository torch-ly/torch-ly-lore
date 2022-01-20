import {doc, updateDoc} from "firebase/firestore";
import {db} from "@/plugins/firebase";
import store from "@/store";

export class Npc {
    constructor (name, alive, permissions, description, quickinfo, id) {
        this.name = name;
        this.alive = alive;
        this.permissions = permissions;
        this.description = description;
        this.quickinfo = quickinfo;
        this._id = id;
    }
    ref() {
        return doc('campaigns', store.state.campaign, this._id).withConverter(npcConverter);
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
            permissions: this.permissions,
            description: this.description,
            quickinfo: this.quickinfo,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Npc(data.name, data.alive, data.permissions, snapshot.id);
    }
};
