<template>
  <PopupContainer :open="open" @close="close">
    <form @submit.prevent="accept">
      <div>
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <UsersIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
        </div>
        <div class="mt-3 text-center sm:mt-5">
          <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
            Add an NPC
          </DialogTitle>
          <div class="mt-2">
            <p class="text-sm text-gray-500">

              <!-- name -->
              <div class="mt-2 px-2">
                <div class="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                  <label for="name" class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900">Name</label>
                  <input v-model="character.name" type="text" id="name" class="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm" placeholder="Jane Doe" required />
                </div>
              </div>

              <!-- is alive -->
              <div class="relative mt-6 px-2">
                  <label for="alive" class="absolute -top-2 left-4 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900">Alive</label>
                  <select v-model="character.alive" id="alive" name="alive" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>true</option>
                    <option>false</option>
                  </select>
              </div>

            </p>
          </div>
        </div>
      </div>
      <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
        <button type="submit" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">
          Add
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

let component = null;

export default {
  components: {PopupContainer, DialogTitle, UsersIcon},
  data() {
    return {
      open: false,
      close: () => {},
      accept: () => {},
      character: null
    };
  },
  mounted() {
    component = this;
  }
}

export async function newNPC() {
  component.open = true;

  // reset character
  component.character = {
      name: null,
      alive: true,
      description: [],
      quickinfo: [],
      permissionRead: ["false", "false", component.$store.state.user?.uid],
      permissionWrite: ["false", "false", component.$store.state.user?.uid]
  }

  return await new Promise((resolve, reject) => {

    component.close = () => {
      component.open = false;
      reject();
    }
    component.accept = () => {
      component.open = false;
      resolve(component.character);
    }
  });

}
</script>
