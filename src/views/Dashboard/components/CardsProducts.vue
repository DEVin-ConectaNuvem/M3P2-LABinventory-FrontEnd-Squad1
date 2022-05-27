<template>

   <!--  <div class="card text-center">
        <div class="card-header"><slot name="img"></slot> </div>
        <div class="card-body">
            <h5 class="card-title"><slot name="title"></slot></h5>
            <p class="card-text"><slot name="categoria"></slot></p>
            <span></span>
        </div>
        <div class="card-footer text-muted"><slot name="status"></slot></div>
    </div> -->

    <ul class="cards">
  <li>
    <a href="" class="card">
        <slot name="img" class="card__image"></slot>
      
      <div class="card__overlay">
        <div class="card__header">
          <slot name="collaborator" ></slot>                
          
          <div class="card__header-text">
            <h3 class="card__title"><slot name='title'></slot></h3>            
            <span class="card__status"><slot name='status'></slot></span>
          </div>
        </div>
        <p class="card__description"><slot name="category"></slot>></p>
      </div>
    </a>      
  </li>  
</ul>

</template>

<script setup>

</script>

<style lang="scss" scoped>


.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 4rem 5vw;
  padding: 0;
  list-style-type: none;
  max-width: 250px;
}

.card {
  position: relative;
  display: block;
  height: 100%;  
  border-radius: calc(var(--curve) * 1px);
  overflow: hidden;
  text-decoration: none;
}

.card__image {      
  width: 100%;
  height: auto;
}

.card__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;      
  border-radius: calc(var(--curve) * 1px);    
  background-color: var(--surface-color);      
  transform: translateY(100%);
  transition: .2s ease-in-out;
}

.card:hover .card__overlay {
  transform: translateY(0);
}

.card__header {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2em;
  padding: 2em;
  border-radius: calc(var(--curve) * 1px) 0 0 0;    
  background-color: var(--surface-color);
  transform: translateY(-100%);
  transition: .2s ease-in-out;
}


.card__arc path {
  fill: var(--surface-color);
  d: path("M 40 80 c 22 0 40 -22 40 -40 v 40 Z");
}       

.card:hover .card__header {
  transform: translateY(0);
}


.card__title {
  font-size: 1em;
  margin: 0 0 .3em;
  color: #6A515E;
}

.card__tagline {
  display: block;
  margin: 1em 0;
  font-family: "MockFlowFont";  
  font-size: .8em; 
  color: #D7BDCA;  
}

.card__status {
  font-size: .8em;
  color: #D7BDCA;
}

.card__description {
  padding: 0 2em 2em;
  margin: 0;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: clip ellipsis
}    
</style>