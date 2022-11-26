<template>
  <div class="text-center">
    <div class="row">
      <p v-text="props.msg"></p>
    </div>
    <div>
      <button
        class="btn btn-success"
        @click="$emit('close-toast')"
        v-if="props.buttonNew"
        v-text="props.buttonNew"
      ></button>
    </div>
    <button
      class="btn btn-secondary mt-2"
      @click="$emit('listCollabs')"
      v-if="props.buttonList"
      v-text="props.buttonList"
    ></button>
  </div>
</template>

<script setup>
const props = defineProps({
  msg: {
    type: String,
    required: true
  },
  buttonList: {
    type: String,
    required: false
  },
  buttonNew: {
    type: String,
    required: false
  }
})
</script>
