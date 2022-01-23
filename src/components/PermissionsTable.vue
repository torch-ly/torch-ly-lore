<template>
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
                Role
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Remove</span>
              </th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">

            <!-- Default Row -->
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      Default
                    </div>
                    <div class="text-sm text-gray-500">
                      This is what unauthorized users can see
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div>
                  <select :value="defaultPermissions ? 'Read' : 'No Read'" @change="changeDefaultPermissions($event.target.value)" class="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>Read</option>
                    <option selected="">No Read</option>
                  </select>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" />
            </tr>

            <!-- Users Row -->
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      Users
                    </div>
                    <div class="text-sm text-gray-500">
                      This rules apply to all users of this campaign
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div>
                  <select :value="userPermissions" @change="changeUsersPermissions($event.target.value)" class="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>No Read</option>
                    <option>Read</option>
                    <option>Write</option>
                  </select>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" />
            </tr>

            <!-- Specific User rows -->
            <tr v-for="{user, write} in directPermissions" :key="user.uid">
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
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div>
                  <select :value="write ? 'Write' : 'Read'" @change="changePermissions(user.uid, $event.target.value)" class="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>Read</option>
                    <option selected="">Write</option>
                  </select>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div @click="remove" class="text-red-500 text-lg"><font-awesome-icon icon="trash" /></div>
              </td>
            </tr>

            <!-- Space -->
            <tr><td></td><td></td><td></td></tr>

            <!-- Other User rows -->
            <tr v-for="user in otherUsers" :key="user.uid">
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
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div>
                  <select @change="addPermissions(user.uid, $event.target.value)" class="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option selected="">No Special</option>
                    <option>Read</option>
                    <option>Write</option>
                  </select>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div @click="remove" class="text-red-500 text-lg"><font-awesome-icon icon="trash" /></div>
              </td>
            </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getConfirmation} from "@/components/Popups/Confirmation";

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
  },
  emits: ['update'],
  computed: {
    userPermissions() {
      let out = "No Read";
      if (this.item.permissionRead.includes("users")) {
        out = "Read";
      }
      if (this.item.permissionWrite.includes("users")) {
        out = "Write";
      }
      return out;
    },
    defaultPermissions() {
      return this.item.permissionRead.includes("default");
    },
    directPermissions() {

      let direct = [];

      for (let user of this.item.permissionRead.slice(2)) {
        console.log(user, this.$store.state.users);
        direct.push({
          user: this.$store.state.users.find(u => u.id === user),
          write: false
        });
      }

      for (let user of this.item.permissionWrite.slice(2)) {
        for (let readPart of direct) {
          if (readPart.user.id === user) {
            readPart.write = true;
          }
        }
      }

      return direct;
    },
    otherUsers() {
      let uids = this.$store.state.campaignData?.users

      if (!uids) return [];

      let users = [];

      for (let uid of uids) {
        if (this.item.permissionRead.includes(uid) || this.item.permissionWrite.includes(uid)) {
          continue;
        }
        users.push(this.$store.state.users.find(user => user.uid === uid));
      }

      return users;
    }
  },
  methods: {
    changeDefaultPermissions(value) {
      if (value === "Read") {
        this.item.permissionRead[0] = "default";
      } else {
        this.item.permissionRead[0] = "false";
      }

      this.$emit('update', {
        permissionRead: this.item.permissionRead,
        permissionWrite: this.item.permissionWrite
      });

    },
    changeUsersPermissions(value) {
      if (value === "No Read") {
        this.item.permissionRead[1] = "false";
        this.item.permissionWrite[1] = "false";
      } else if (value === "Read") {
        this.item.permissionRead[1] = "users";
        this.item.permissionWrite[1] = "false";
      } else {
        this.item.permissionRead[1] = "users";
        this.item.permissionWrite[1] = "users";
      }

      this.$emit('update', {
        permissionRead: this.item.permissionRead,
        permissionWrite: this.item.permissionWrite
      });

    },
    changePermissions(userId, value) {
      if (value === "Write") {
        this.item.permissionWrite.push(userId);
      } else {
        this.item.permissionWrite.splice(this.item.permissionWrite.indexOf(userId), 1);
      }

      this.$emit('update', {
        permissionRead: this.item.permissionRead,
        permissionWrite: this.item.permissionWrite
      });

    },
    addPermissions(userId, value) {
      if (value === "Write") {
        this.item.permissionRead.push(userId);
        this.item.permissionWrite.push(userId);
      } else {
        this.item.permissionRead.push(userId);
      }

      this.$emit('update', {
        permissionRead: this.item.permissionRead,
        permissionWrite: this.item.permissionWrite
      });

    },
    remove(userId) {
      getConfirmation("Remove Permissions", "Are you sure you want to remove all special permissions for this user? If you do so they may (depending on the other permissions) lose access to this page.", "Remove").then(() => {
        this.item.permissionRead.splice(this.item.permissionRead.indexOf(userId), 1);
        this.item.permissionWrite.splice(this.item.permissionWrite.indexOf(userId), 1);

        this.$emit('update', {
          permissionRead: this.item.permissionRead,
          permissionWrite: this.item.permissionWrite
        });
      });
    }
  }
}
</script>
