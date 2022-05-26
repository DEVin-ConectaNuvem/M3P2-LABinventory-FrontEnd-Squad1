<template>
    <div>
        <div class="py-4 px-4 flex justify-between"><span class="text-2xl">$20,000</span><svg class="vben-svg-icon anticon anticon" aria-hidden="true" data-v-442f5584="" style="width: 40px; height: 40px;"><use xlink:href="#icon-total-sales" data-v-442f5584=""></use></svg></div>
        <div class="card text-dark bg-light text-center">
          <div class="card-body row">
            <div class="col-6 fs-4" >
                <slot name="count"></slot>
                
            </div>
            <div class="col-6 fs-2">
                <slot name="icon"></slot>
            </div>
            <hr>
                 <h3><slot name="title"></slot></h3>
          </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.card {
    width: 100%;
    height: 7rem;
}
</style>