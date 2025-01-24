<template>
  <h1>Whoops, you traveled to an unexisting page {{ $route.params.catchAll }}.</h1>
  Try going <router-link class="nav-link" to="/">home.</router-link>
  <br />
</template>
