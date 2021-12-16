<template>
  <div class="h-full bg-gray-700 shadow-xl p-4 text-text-light">
    <span class="text-lg ml-2">{{ $store.state.campaign.id }}</span>

    <hr class="my-6 border-gray-500">

    <router-link class="mt-4 block" :to="'/w/' + $store.state.campaign.id">
      <div class="flex">
        <div class="w-8 inline-block">
          <font-awesome-icon class="mt-1 mr-2" icon="book"></font-awesome-icon>
        </div>
        <div>Campaign Overview</div>
      </div>
    </router-link>

    <hr class="my-6 border-gray-500">

    <router-link class="mt-2 block" :to="'/w/' + $store.state.campaign.id + '/characters'">
      <div class="flex">
        <div class="w-8 inline-block">
          <font-awesome-icon class="mt-1 mr-2" icon="user-friends"></font-awesome-icon>
        </div>
        <div>Character</div>
      </div>
    </router-link>

    <hr class="my-6 border-gray-500">

    <h2 class="font-semibold ml-8">Places</h2>

    <router-link class="mt-2 block" :to="'/w/' + $store.state.campaign.id + '/cities'">
      <div class="flex">
        <div class="w-8 inline-block">
          <font-awesome-icon class="mt-1 mr-2" icon="university"></font-awesome-icon>
        </div>
        <div>Cities & Regions</div>
      </div>
    </router-link>

    <router-link class="mt-2 block" :to="'/w/' + $store.state.campaign.id + '/maps'">
      <div class="flex">
        <div class="w-8 inline-block">
          <font-awesome-icon class="mt-1 mr-2" icon="map"></font-awesome-icon>
        </div>
        <div>Maps</div>
      </div>
    </router-link>

  </div>
</template>
