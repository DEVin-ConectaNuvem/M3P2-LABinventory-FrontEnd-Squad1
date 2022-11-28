<template>
  <div>
    <img v-if="imgData" :src="imgData" />
    <img v-else-if="typeImage === 'Avatar'" src="@/assets/icons/user-default.svg" />
    <img v-else src="@/assets/icons/image-svgrepo-com.svg" />
    <a
      class="btn btn-primary"
      @click="toggleShow"
      data-testid="colab-upload-file"
      >Upload</a
    >
    <my-upload
      field="img"
      @crop-success="cropSuccess"
      langType="pt-br"
      v-model="show"
      :width="150"
      :height="150"
      img-format="png"
    >
    </my-upload>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import myUpload from 'vue-image-crop-upload'

const props = defineProps({
  imgDataUser: {
    type: String,
    required: false,
    default: ''
  },
  type: {
    type: String,
    required: false,
    default: ''
  }
})

const typeImage = computed(() => props.type)

const emit = defineEmits(['uploadSuccess'])

const show = ref(false)
const imgData = ref('')

watch(
  () => props.imgDataUser,
  val => {
    if (val) {
      imgData.value = val
    }
  },
  { deep: true }
)

function toggleShow() {
  show.value = !show.value
}

function cropSuccess(imgData64, field) {
  imgData.value = imgData64
  if (field === 'img') {
    emit('uploadSuccess', imgData64)
  }
}
</script>

<style scoped>
img {
  align-content: center;
}

div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

a {
  margin-top: 10px;
}
</style>
