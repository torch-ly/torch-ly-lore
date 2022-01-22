<template>
  <PopupContainer :open="open" @close="close">
    <form @submit.prevent="accept">
      <div>
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <UsersIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
        </div>
        <div class="mt-3 text-center sm:mt-5">
          <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
            Change Player Status
          </DialogTitle>
          <div class="mt-2">
            <p class="text-sm text-gray-500">

            <!-- is alive -->
            <div class="relative mt-6 px-2">
              <label for="alive" class="absolute -top-2 left-4 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900">Role</label>
              <select v-model="role" id="alive" name="alive" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>GM</option>
                <option>User</option>
              </select>
              <p class="text-left mt-2 text-sm text-gray-500" id="email-description">Setting to GM can not be reversed yet!</p>
            </div>

            </p>
          </div>
        </div>
      </div>
      <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-3 sm:gap-3 sm:grid-flow-row-dense">
        <button type="submit" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-3 sm:text-sm">
          Add
        </button>
        <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-2 sm:text-sm" @click="confirmKick">
          Remove
        </button>
        <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm" @click="close">
          Cancel
        </button>
      </div>
    </form>
  </PopupContainer>
</template>
<script>
import PopupContainer from "@/components/Popups/PopupContainer";
import {DialogTitle} from "@headlessui/vue";
import {UsersIcon} from "@heroicons/vue/outline";
import {getConfirmation} from "@/components/Popups/Confirmation";

let component = null;

export default {
  components: {PopupContainer, DialogTitle, UsersIcon},
  data() {
    return {
      open: false,
      close: () => {},
      accept: () => {},
      role: "",
      kick: () => {},
    };
  },
  mounted() {
    component = this;
  },
  methods: {
    confirmKick() {
      this.role = "kick";
      this.accept();
    }
  }
}

export async function editUser(isUser, kick) {
  component.open = true;

  if (isUser) {
    component.role = "User";
  } else {
    component.role = "GM";
  }

  component.kick = kick;

  return await new Promise((resolve, reject) => {

    component.close = () => {
      component.open = false;
      reject();
    }
    component.accept = () => {
      component.open = false;
      resolve(component.role);
    }
  });

}
</script>
