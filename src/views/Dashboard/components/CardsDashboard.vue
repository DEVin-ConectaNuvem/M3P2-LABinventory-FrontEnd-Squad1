<template>
   
		 <div class="card radius-10 border-0 border-info">
			<div class="card-context">
				<div class="d-flex align-items-center">
					<div>
						<p class="mb-0 text-secondary"><slot name="title"></slot> </p>
						<h4 class="my-1"><slot name="count"></slot></h4>
						<p class="mb-0 "><slot name="infos"></slot></p>
					</div>
					<slot name="icon"></slot>
				</div>
			</div>
		 </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.radius-10 {
    border-radius: 10px;
}

.card {
    height: 130px;
    width: 250px;
    margin: 10px;
    margin-bottom: 1.5rem;
    box-shadow: 0 7px 6px 0 rgb(218 218 253 / 65%), 0 2px 6px 0 rgb(206 206 238 / 54%);
    
}

</style>