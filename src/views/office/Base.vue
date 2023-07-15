<template>
  <div class="row">
    <div class="col col-3">
      <ul class="list-group">
        <router-link :to="{name: 'office'}" class="list-group-item" tag="li">
          <a>Main screen</a>
        </router-link>
        <router-link :to="{name: 'office-orders'}" class="list-group-item" tag="li">
          <a>Orders history</a>
        </router-link>
      </ul>
    </div>
    <div class="col col-9">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {}
</script>
