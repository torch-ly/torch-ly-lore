<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flex flex-col" v-if="$store.state.user != null || isGM || isUser">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th v-if="isGM" scope="col" class="relative px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in campaignUsers" :key="user.uid">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-full" :src="user.photoURL" alt="" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ user.displayName }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ user.email }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ user.role }}
              </td>
              <td v-if="isGM" class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-indigo-600 hover:text-indigo-900" @click="edit">Edit</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="mt-52 text-center">
    <span class="text-5xl">You are not allowed to be here!</span>
    <button @click="$router.push({name: 'Campaign Home'})"  type="button" class="block mx-auto mt-12 items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      Go back
    </button>
  </div>
</template>

<script>

import {editUser} from "@/components/Popups/EditUser";

export default {
  computed: {
    campaignUsers() {
      let out = [];
      if (this.$store.state.campaignData.users == null) {
        return out;
      }

      for (let cUsers of this.$store.state.campaignData.gms) {
        out.push({
          role: "GM",
          ...this.$store.state.users.find((u) => u.id === cUsers)
        });
      }

      for (let cUsers of this.$store.state.campaignData.users) {
        out.push({
          role: "User",
          ...this.$store.state.users.find((u) => u.id === cUsers)
        });
      }

      return out;

    },
    isGM() {
      return this.$store.state.campaignData.gms?.includes(this.$store.state.user?.uid);
    },
    isUser() {
      return this.$store.state.campaignData.users?.includes(this.$store.state.user?.uid);
    },
    edit(user) {
      // TODO: Add editUser
      console.log("Edit user not implemented");
    }
  }
}
</script>
