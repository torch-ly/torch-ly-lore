<template>
  <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
      <tr>
        <th>Name</th>
        <th>uuid</th>
        <th>Role</th>
        <th class="relative px-6 py-3">
          <span class="sr-only">Kick</span>
        </th>
      </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
      <tr v-for="user in campaign.users" class="even:bg-gray-50">
        <td class="text-gray-800">{{user.object.name}}</td>
        <td class="text-gray-800">{{user.object.id}}</td>
        <td class="text-gray-500">
          <span v-if="!canEditPermission">{{user.permission}}</span>
          <select v-if="canEditPermission" v-model="user.permission" @change="updatePermission">
            <option v-for="{name: perm} in campaign.permissions" :value="perm" class="p-2">{{perm}}</option>
          </select>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <a href="#" class="text-indigo-600 hover:text-indigo-900">Kick</a>
        </td>
      </tr>
      </tbody>

    </table>
  </div>
</template>
<script>
import {db} from "../../../plugins/firebase";
import router from "../../../router";

export default {
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
  methods: {
    updatePermission() {

      let users = [];
      for (let user of this.campaign.users) {
        users.push({
          object: db.doc("users/" + user.object.id),
          permission: user.permission
        });
      }

      this.dbRef.update({
        users
      });
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
