<template>
  <div id="app">
    <NavBar />
    <router-view/>

  </div>
</template>
<script>
import NavBar from "./components/nav/NavBar";
export default {
  components: {NavBar}
}
</script>
