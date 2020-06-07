Vue.component('product',{
	props:{
		premium:{
			type: Boolean,
			required:true
		}
	},
	template: ` 
	<div class="product">
        
    <div class="product-image">
      <img :src="image" />
    </div>

    <div class="product-info">
      <h1>{{ title }}</h1>
      <p v-if="inStock">In Stock</p>
      <p :class="{outOfStock : !inStock}" v-else>Out of Stock</p>
      <p>User is premium: {{premium}}</p>
      <p>Shipping: {{shipping}}</p>

      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>


        <div class="color-box"
             v-for="(variant, index) in variants" 
             :key="variant.variantId"
             :style="{ backgroundColor: variant.variantColor }"
             @mouseover="updateProduct(index)"
             >
        </div> 

        <button v-on:click="addToCart" 
          :disabled="!inStock"
          :class="{ disabledButton: !inStock }"
          >
        Add to cart
        </button>

        </div>

        <product-review></product-review>  
    
  </div>
	`,
	 data(){
	 	return {
        product: 'Socks',
        brand: 'Vue Mastery',
        selectedVariant: 0,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
          {
            variantId: 2234,
            variantColor: 'green',
            variantImage: 'sock1.jpg',
            variantQuantity: 10     
          },
          {
            variantId: 2235,
            variantColor: 'blue',
            variantImage: 'bluesock.jpg',
            variantQuantity: 0     
          }
        ]
       
           }
	 },
	  
    methods: {
        addToCart: function() {
          this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId )  
        },
        updateProduct: function(index) {  
            this.selectedVariant = index
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product  
        },
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
          if (this.onSale) {
            return this.brand + ' ' + this.product + ' are on sale!'
          } 
            return  this.brand + ' ' + this.product + ' are not on sale'
        },
        shipping(){
        	if(this.premium){
        		return "Free"
        	}
        	return 2.99
        }
    }

})

Vue.component('product-review',{
	template:`
		<input v-model="name">
	`,
	data(){
		return{
			name:null
		}
	}
})
var app = new Vue({
    el: '#app',
    data: {
    	premium: true,
    	 cart: []
    },
    methods:{
    	updateCart(id){
    		this.cart.push(id)
    	}
    }
   
  })