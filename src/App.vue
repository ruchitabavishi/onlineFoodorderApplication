<template>
  <div id="app">
    <div class="row">
      <div class="col-sm-2"></div>
      <div class="col-sm-8">
        <div class="container1">
          <h4 style="margin:2px">FAVOURITES</h4>
          <span style="margin-right:200px">Enjoy What You Have Been Ordering!</span>    CART:{{CartCount}}
          <ul class="hs full">
            <div v-for="(post, index) in favList" v-bind:key="index">
              <li class="item">
                <img v-bind:src="post.img" height="70%">
                    <span style="overflow-wrap: break-word; margin-right:20px">{{post.title}} </span>
                    <button>REORDER</button>
              </li>
            </div>
          </ul>
        </div>
        <div class="container2" style="height:500px; overflow-y: scroll;">
          <div>
            <div>
              <br>
              <div class="search-wrapper">
                <input
                  type="text"
                  v-model="search"
                  placeholder="searh for perticular dish"
                  style="width:490px"
                >
                <br>

                <b-button variant="outline-secondary" @click="breakfastClick()">STATER</b-button>
                <b-button variant="outline-secondary" @click="desertClicl()">DESSERT</b-button>
              </div>
              <br>
              <div class="wrapper">
                <div div v-for="(post, index) in filteredList" v-bind:key="index" class="card">
                  <a v-bind:href="post.link" target="_blank">
                    <img v-bind:src="post.img">
                  </a>
                  <div>
                    <h5 style="margin:2px">{{ post.title }}</h5>
                     <b-button-group>
                    <b-button @click="add(post.title)">+</b-button>
                    <b-button @click="remove(post.title)">-</b-button>
                  </b-button-group>
                  </div>
                  <div>RS.{{ post.author }}</div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-2" style="margin-top:90px; margin-left:20px"></div>
    </div>
  </div>
</template>


<script>
import foodItem from "../store/food";
class Post {
  constructor(title, link, author, img) {
    this.title = title;
    this.link = link;
    this.author = author;
    this.img = img;
  }
}
export default {
  name: "app",

  data() {
    return {
      addedItem:[],
      CartCount:"",
      search: "",
      favList: [],
      postList: [],
      originalPostList: []
    };
  },
  computed: {
    filteredList() {
      return this.postList.filter(post => {
        return post.title.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  mounted() {
    foodItem.getFoodItems().then(resp => {
      resp.data.recipes.forEach(element => {
        if (element.isFavourite) {
          this.favList.push(
            new Post(
              element.name,
              element.category,
              element.price,
              element.image
            )
          );
        }
        this.postList.push(
          new Post(element.name, element.category, element.price, element.image)
        );
      });
      this.originalPostList = this.postList;
    });
  },
  methods: {
    add(title){
      let ifAdded= false
      this.addedItem.forEach(element => {
        if(element.itemTitle == title){
          element.count++
          ifAdded =true
        }
       
      });
      if(!ifAdded){
         
          this.addedItem.push({
            itemTitle:title,
            count:1
          })
        
      }
      this.CartCount++
    },
    remove(title){
      debugger
      this.addedItem.forEach(element => {
        if(element.itemTitle == title && element.count!=0){
          element.count--
         this.CartCount--
        }
      })
    },
    breakfastClick() {
      this.postList = this.originalPostList.filter(l => l.link == "Starters");
      console.log(this.postList);
    },
    desertClicl() {
      this.postList = this.originalPostList.filter(l => l.link == "Dessert");
    }
  }
};
</script>

<style>
:root {
  --gutter: 20px;
}

.app {
  padding: var(--gutter) 0;
  display: grid;
  grid-gap: var(--gutter) 0;
  grid-template-columns: var(--gutter) 1fr var(--gutter);
  align-content: start;
}

.app > * {
  grid-column: 2 / -2;
}

.app > .full {
  grid-column: 1 / -1;
}

.hs {
  display: grid;
  grid-gap: calc(var(--gutter) / 2);
  grid-template-columns: repeat(7, calc(50% - var(--gutter) * 2));
  grid-template-rows: minmax(150px, 1fr);
  /* padding: 0 20px; */

  overflow-x: scroll;
  scroll-snap-type: x proximity;
  padding-bottom: calc(0.75 * var(--gutter));
  margin-bottom: calc(-0.25 * var(--gutter));
}

.hs > li:last-child {
  /* margin-right: 20px; */
}

/* Demo styles */

html,
body {
  height: 100%;
}

body {
  display: grid;
  place-items: center;
  background: white;
}

ul {
  list-style: none;
  padding: 0;
}

h1,
h2,
h3 {
  margin: 0;
}

.app {
  width: 100%;
  height: 100%;
  /* margin-top: -250px; */
  background: #dbd0bc;
  overflow-y: scroll;
}

.hs > li,
.item {
  scroll-snap-align: center;
  /* padding: calc(var(--gutter) / 2 * 1.5); */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: none;
  height: 250px;
  border-radius: 8px;
  margin-left: -70px;
  margin-right: -70px;
  margin-bottom: -15px;
}
/* .container1{
    border: 1px solid #ddd;
  width: 24%;
  background-color: white;
  float: left;
  border: 2px solid #c00;
  margin-right: 5px;
  min-height: 50px;
  position: fixed;
}
.container2{
   min-height: 1000px;
  width: 45%;
  margin-right: 5px;
  overflow: auto;
  background-color: green;
  position: absolute;
  left: 28.5%
} */
.h4 {
}
</style>

