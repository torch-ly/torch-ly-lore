<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div v-if="isGM || isUser">
    <h3 class="text-lg font-semibold mb-2 mt-4">Users</h3>
    <div class="flex flex-col">
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
                <th v-if="isGM" scope="col" class="relative px-6 py-3 text-right text-gray-900">
                  <span class="sr-only">Edit</span>
                  <font-awesome-icon class="mr-1" icon="plus" @click="addNewUser" />
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
import {notify} from "@/components/Notification";
import {functions} from "@/plugins/firebase";
import { httpsCallable } from "firebase/functions";

export default {
  computed: {
    campaignUsers() {
      let out = [];
      if (this.$store.state.campaignData == null) {
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
      return this.$store.getters.isGM
    },
    isUser() {
      return this.$store.getters.isUser
    }
  },
  methods: {
    edit(user) {
      // TODO: Add editUser
      console.log("Edit user not implemented");
    },
    addNewUser() {
      const getInviteLink = httpsCallable(functions, 'getInviteLink');
      const campaign = this.$route.params.campaign;


      getInviteLink({ campaign }).then(({data}) => {
        notify("Created invite link: " + data, "Copy", () => {
          navigator.clipboard.writeText("https://" + location.hostname + "/w/" + campaign + "/join/?key=" + data);
        });
      }).catch(((error) => {
        console.log(error);
      }))
    }
  }

}
</script>
