<template>
  <div class="wrap">
    <div class="box one">
      <h1>
        <slot name="title"></slot>
      </h1>
      <slot name="img" class="imageBg"></slot>
      <div class="date">
        <h4>
          <slot name="id"> </slot>
        </h4>
      </div>
      <div class="poster">
        <slot name="collab"></slot>
      </div>
    </div>
  </div>
</template>

<script setup></script>
<style lang="scss" scoped>
.wrap {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}

.box {
  display: inline-block;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 250px;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 20px !important;

  text-align: center;
  border-radius: 3px;
  -webkit-transition: 200ms ease-in-out;
  -o-transition: 200ms ease-in-out;
  transition: 200ms ease-in-out;
  -webkit-box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}

.box:hover {
  margin-bottom: -5px;
}

.box h1 {
  color: #fff;
  font-size: 1.2rem;
  font-weight: 550;
  background: var(--color-dark);
  -webkit-box-shadow: 0 0 30px rgba(0, 0, 0, 0.7);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
}

.poster {
  width: 100%;
  padding-bottom: 8px;
  margin: 0;
  position: absolute;
  top: 100%;
  transform: translate(0, -50%);
  color: #fff;
  font-weight: 500;
  border-radius: 50px;
}
</style>
