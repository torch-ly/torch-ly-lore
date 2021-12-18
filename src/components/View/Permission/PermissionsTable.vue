<template>
  <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
      <tr>
        <th>Permission Name</th>
        <th>Root Permission</th>
        <th>
          <button @click="newPermission" class="bg-red-700 bg-accent px-3 py-1 rounded-sm text-sm font-bold uppercase select-none float-right">New Permission</button>
        </th>
      </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
      <tr v-for="(perm, index) in campaign.permissions" class="even:bg-gray-50">
        <td class="text-gray-800">
          <SingleLineEdit :editMode="!['gm', 'default'].includes(perm.name)" noTrash @focusLost="updatePermission" v-model="perm.name" />
        </td>
        <td class="text-gray-500">
          <div v-if="canEditPermission && perm.name !== 'gm' && perm.root !== 'none'" class="flex">
            <select v-model="perm.root" @change="updatePermission">
              <option v-for="{name} in campaign.permissions"  v-if="name !== perm.name" :value="name" class="p-2">{{name}}</option>
            </select>
            <div v-if="distanceToDefault(perm, 0) <= -5000" class="text-gray-800 ml-2 relative group">
              <div class="hidden group-hover:block absolute bottom-7">
                <div class="bg-gray-300 transform -translate-x-1/2 ml-2 p-2 rounded">This class has <br> GM permission</div>
                <div class="bg-gray-300 transform rotate-45 h-4 w-4 -mt-2" />
              </div>
              <font-awesome-icon class="text-red-500" icon="exclamation-circle" />
            </div>
          </div>
          <span v-else>{{perm.root}}</span>
        </td>
        <td v-if="perm.name !== 'gm' && perm.name !== 'default'" class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button class="text-indigo-600 hover:text-indigo-900" @click="removePermission(index)">Remove</button>
        </td>
      </tr>
      </tbody>

    </table>
  </div>
</template>
<script>
import {db} from "../../../plugins/firebase";
import router from "../../../router";
import SingleLineEdit from "../../SingleLineEdit";

export default {
  components: {SingleLineEdit},
  computed: {
    canEditPermission() {
      return true;
    },
    dbRef() {
      return db.collection('campaigns').doc(router.currentRoute.params.campaign);
    },
    campaign() {
      return this.$store.state.campaign;
    }
  },
  mounted() {
    setTimeout(() => this.sortPermissions(), 1000);
  },
  methods: {
    updatePermission() {
      this.sortPermissions();
      this.dbRef.update({
        permissions: this.campaign.permissions
      });
    },
    newPermission() {
      this.campaign.permissions.push({
        name: 'New Permission',
        root: 'default'
      });
      this.updatePermission();
    },
    removePermission(index) {
      this.campaign.permissions.splice(index, 1);
      this.updatePermission();
    },
    sortPermissions() {
      this.campaign.permissions = this.campaign.permissions.sort((a, b) => {
        if (a.name === 'gm') return -1;
        if (b.name === 'gm') return 1;
        if (a.name === 'default') return 1;
        if (b.name === 'default') return -1;
        return this.distanceToDefault(a, 0) - this.distanceToDefault(b, 0);
      });

    },
    distanceToDefault(perm, dist) {
      if (perm.name === 'default') return dist;
      if (perm.root === 'default') return dist + 1;
      if (perm.name === 'gm') return -10000 + dist;
      return this.distanceToDefault(this.campaign.permissions.find(p => p.name === perm.root), dist + 1);
    }
  }
}
</script>
<style scoped>
th {
  @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
}
td {
  @apply px-6 py-4 whitespace-nowrap;
}
</style>
