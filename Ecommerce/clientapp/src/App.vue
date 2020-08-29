<template>
	<div>
		<product-list></product-list>
	</div>
</template>

<script>
	import ProductList from "./components/products/List.vue"
	
	export default {
		name: 'app',
		components:{
			ProductList
		}
	}
</script>

<style>

</style>
