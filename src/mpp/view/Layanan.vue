<script>
import image from "../assets/img/logo-nav.svg"
export default{
    data(){
        return {
            apps:[],
            loaded: false,
            loadapp: false,
            errors: null,
            selected:{ nama:'', desc:'-', link:'#'},
            iskatcollapse:false,
            katcollapse:'',
            katActive: 'all',
            redirWait: -1,
            gotoLink: '',
            logo: image,
            kategori:[ 
						{class: 'filter-item', filter: 'all', nama: 'All'},
						{class: 'filter-item', filter: 'filter-kab', nama: 'Pemkab'},
						{class: 'filter-item', filter: 'filter-info', nama: 'Informasi'},
						{class: 'filter-item', filter: 'filter-surat', nama: 'Surat'},
						{class: 'filter-item', filter: 'filter-ijin', nama: 'Perijinan'},
						{class: 'filter-item', filter: 'filter-daftar', nama: 'Pendaftaran'},
						{class: 'filter-item', filter: 'filter-bayar', nama: 'Pembayaran'},
						{class: 'filter-item', filter: 'filter-extra', nama: 'Lain-lain'},
						]
        }
    },
    mounted:function(){
        this.fetchData()
        this.selKat(this.katActive)
    },
    computed:{
        myData(){
            if(this.katActive === 'all'){
                return this.apps
            }else{
                return this.apps.filter((t) => t.filter.includes(this.katActive))
            }
        }
    },
    watch:{
        iskatcollapse:{
            handler(news,olds){
                this.katcollapse = news?'':'collapsed'
            },
            immediate: true
        },
        redirWait:{
            handler(news){
                if (news>0) {
                    setTimeout(() => {
                        this.redirWait--
                    }, 1000);
                }
                if (news==0) {
                    this.Redirecting(this.gotoLink)
                    this.redirWait--
                }
            }
        }
    },
    methods:{
        async fetchData(){
            fetch("https://mpp.blitarkab.go.id/layanan/app")
			.then(res => res.json())
            .then(
                result => {
                    this.apps = result
                    this.loaded = true
                },
                error => {
                    this.loaded = true
                    this.errors = error
                }
            )
        },
        selectApp(myApp){
            this.selected.nama = myApp.nama
            this.selected.desc = myApp.desc
            this.selected.link = myApp.link
        },
        selKat(e){
            this.katActive=e
            this.kategori.map((item,i) => {
                this.kategori[i].class = (item.filter === e)?'filter-item filter-active':'filter-item'
            })
        },
        accordion(e){
            this.iskatcollapse = !this.iskatcollapse
        },
        openLink(link){
            this.redirWait = 3
            this.gotoLink = link
        },
        Redirecting(link){
            window.open(link)
        }
    }
}
</script>
<template>
    <nav class="navbar navbar-expand-lg " v-if="loaded">
        <div class="container">
            <a class="navbar-brand" href="#">
                <img :src="logo" alt="" />
            </a>
        </div>
      </nav>

    <div class="text-white" v-if="errors">Error: {errors.message}</div>
    <div class="loader-body" v-else-if="!loaded">
        <div class="loader-container text-center">
            <div class="loader"></div>
            <h1 class="text-white" style="margin-top: 15px">Loading...</h1>
        </div> 
    </div>
    
    <section id="portfolio" class="page-section  flex-grow-1" v-else>
        
    <div v-if="redirWait >= 0" class="redirect-layer" >
        <div class="redirect-body">
            <div class="redirect-container">
                <i class="fa fa-close close-modal" @click="redirWait = -1"></i>
                <h3>{{redirWait}}</h3>
                <h2>Mengalihkan halaman</h2>
                <a :href="gotoLink" target="_blank">klik di sini jika halaman tidak dialihkan</a>
            </div>
        </div>
    </div>
        <div class="container">
            <div>
                <div class="kat text-center">
                    <h3 id="kategori" class="section-heading" >Kategori</h3>
                </div>
                <div class="kat-body" :class="katcollapse">
                    <div class="kat-menu">
                    <ul id="portfolio-flters" class="text-center" >
                        <li v-for="kat in kategori" :key="kat.id" data-filter="" :class="kat.class" @click="selKat(kat.filter)" >{{kat.nama}}</li>
                    </ul>
                    </div>
                    <button class="kat-foot text-center" @click="accordion"></button>
                </div>
            </div>
            <span class="popcon" hidden=""></span>
            <div id="item-list" class="row item-list" >
                <div class=" portfolio-item"  v-for="list in myData" :key="list.id">
                    <div  class="portfolio-link " data-bs-toggle="modal" data-bs-target="#modal-detail" @click="selectApp(list)" >
                        <div class="portfolio-hover">
                            <div class="portfolio-hover-content"></div>
                        </div>
                        <img class="img-fluid" :src="list.ikon" alt="" />
                    </div>
                    <div class="portfolio-caption">
                        <div class="portfolio-caption-heading">{{list.nama}}</div>
                    </div>
                </div>

            </div>
        </div>

        <div class="modal fade" id="modal-detail" tabIndex="-1" role="dialog" >
            <div class="modal-dialog modal-dialog-centered " role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <h5>{{selected.nama}}</h5>
                  <p>{{selected.desc}}</p>
                </div>
                <div class="modal-footer">
                    <button class="close btn btn-danger" data-bs-dismiss="modal">Kembali</button>
                    <button @click="openLink(selected.link)" data-bs-dismiss="modal" class="btn btn-success" >Lanjutkan</button>
                </div>
              </div>
            </div>
        </div>

    </section>

</template>

<style scoped>
.navbar{
    background-color: rgba(255, 255, 255, 0);
}
.navbar-brand img{
    width: 200px;
}
#portfolio{
    padding: 20px 0px;
}
.item-list{
    animation: fadein 1.5s ease-out;
    opacity: 1;
  }
  @keyframes fadein {
    0% { opacity: 0 }
    100% { opacity: 1 }
  }
  
  .kat{
      padding: 10px 0px;
      margin-top: 10px;
      background-color: #fff;
      color:var(--bs-body-color);
      border-radius: 10px 10px 0px 0px;
      border-bottom: #eee 1px solid;
  }
  .kat .section-heading{
    font-size: 1.2rem;
  }
  .kat-menu{
      background-color: #fff;
  }
  
  .kat-body{
      margin-bottom: 10px;
  }
  .kat-body.collapsed .kat-menu{
      display: none;
  }
  .kat-foot {
      background-color: #eee;
      border-top: #eee 1px solid !important;
      border-radius: 0px 0px 10px 10px;
      border: none;
      width: 100%;
  }
  .kat-body.collapsed .kat-foot {
      background-color: #fff;
  }
  .kat-foot:hover,
  .kat-body.collapsed .kat-foot:hover {
      background: var(--blitar-green-hover);
  }
  .kat-foot:hover::after,
  .kat-body.collapsed .kat-foot:hover::after{
      color: #fff;
  }
  .kat-foot::after{
      font-family: "FontAwesome";
      content: "\f106";
      color: #555;
      transform: unset;
      background: none;
  }
  .kat-body.collapsed .kat-foot::after {
      content: "\f107";
  }
  
  #portfolio-flters{
      display: block;
      margin:0;
      list-style-type: none;
      padding: 10px 20px;
  }
  #portfolio-flters li {
      background: var(--blitar-green);
      color: #fff;
      margin: 5px 2.5px 25px 2.5px;
      border-radius: 5px;
      list-style: none;
      text-align: center;
      cursor: pointer;
      display: inline-block;
      padding: 10px 15px;
      font-size: .6em;
      font-weight: 500;
      line-height: 1;
      text-transform: uppercase;
      margin-bottom: 0px;
      transition: all 0.1s ease-in-out;
      font-family:  "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }
  #portfolio-flters .filter-active{
      background: var(--bs-primary);
      color: var(--blitar-green-hover);
    }
  #portfolio-flters li:hover {
      background: var(--blitar-green-hover);
      color: #fff;
  }
  #portfolio .portfolio-item,
  .item-list .portfolio-item{
      opacity: 1;
      margin-left: unset !important;
      margin-right: unset !important;
      margin-top: 10px !important;
      max-width: 33.333333% !important;
      padding: 12px !important;
  }
  #portfolio .portfolio-item .portfolio-caption,
  .item-list .portfolio-item .portfolio-caption {
      padding: 8px !important;
      background: rgba(255,255,255,0) !important;
      text-align: center;
  }
  
  #portfolio .portfolio-item .portfolio-caption .portfolio-caption-subheading,
  .item-list .portfolio-item .portfolio-caption .portfolio-caption-subheading {
      font-size: .8em !important;
      color: #aaa !important;
  }
  
  #portfolio .portfolio-item .portfolio-caption .portfolio-caption-heading,
  .item-list .portfolio-item .portfolio-caption .portfolio-caption-heading{
      font-size: .7rem !important;
      color: #fff;
      font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !important;
      font-weight: 700 !important;
      margin-bottom: 0 !important;
  }
  #portfolio .portfolio-item .portfolio-link .portfolio-hover {
      background: rgba(var(--blitar-green-rgb), .45) !important;
  }
  .portfolio-link{
      cursor: pointer;
  }
  .portfolio-link .img-fluid, .portfolio-link .portfolio-hover{
      border-radius: 50%;
    }
  .portfolio-link .portfolio-hover{
      box-shadow: 0px 0px 10px var(--blitar-green) !important;
  }

  .loader-body {
	min-height: 100vh;
	width: 100%;
	display: flex;
	background-color: rgba(0,0,0,.3);
}
.loader-container {
	/*align-items: center;
	display: flex;*/
	margin: auto;
}
.loader {
    border: 12px solid #f3f3f3; /* Light grey */
    border-top: 12px solid var(--blitar-green); /* Blue */
    border-radius: 50%;
    width: 75px;
    height: 75px;
    animation: spin 1.5s ease infinite;
    margin-left: auto;
    margin-right: auto;
  }
  .redirect-layer {
    position: fixed; /* Sit on top of the page content */
    width: 100%; /* Full width (cover the whole page) */
    height: 100%; /* Full height (cover the whole page) */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5); /* Black background with opacity */
    z-index: 999;
}
.redirect-body {
	width: 300px;
    height: 150px;
	display: flex;
    align-items: center;
    background-color: #fff;
    box-shadow: #222 5px 5px 20px;
    position: fixed;
    z-index: 999;
    left: 50%;
    top: 50%;
    margin-left: -150px;
    margin-top: -75px;
}
.redirect-container {
	/*align-items: center;
	display: flex;*/
	margin: auto;
    text-align: center;
}
.redirect-container .close-modal{
    color: #000;
    transform: translateX(125px);
}
.redirect-container .close-modal:hover{
    color: var(--blitar-green-hover);
}
.redirect-container h2,
.redirect-container h3 {
    
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0px;
}
.redirect-container h3{
    font-size: 3rem;
}
.redirect-container h2{
    font-size: 1rem;
}
.redirect-container a{
    font-size: .8rem;
    text-decoration: none;
    color: var(--blitar-green);
}
.redirect-container a:hover{
    color: var(--blitar-green-hover);
}
.redirect-container h2::after{
    content: '.';
    animation: dots 1s steps(5, end) infinite;
}
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  } 
@keyframes dots {
    20% {
        color: rgba(0, 0, 0, 0);
        text-shadow:
          .25em 0 0 rgba(0, 0, 0, 0),
          .5em 0 0 rgba(0, 0, 0, 0);}
      40% {
        color: black;
        text-shadow:
          .25em 0 0 black,
          .5em 0 0 black;}
      60% {
        text-shadow:
          .25em 0 0 black,
          .5em 0 0 rgba(0, 0, 0, 0);}
      80%, 100% {
        text-shadow:
          .25em 0 0 rgba(0, 0, 0, 0),
          .5em 0 0 rgba(0, 0, 0, 0);}
  }
/*===================screen=======================*/

@media (min-width: 576px){
    #portfolio .portfolio-item .portfolio-caption .portfolio-caption-heading {
        font-size: .7em !important;
    }
    #portfolio .portfolio-item{
        max-width: 20% !important;
        padding: 15px !important;
    }
    #portfolio-flters li{
        font-size: 0.7em;
    }

}

@media (min-width: 992px){
    #portfolio .portfolio-item .portfolio-caption .portfolio-caption-heading {
        font-size: .9em !important;
    }
    #portfolio .portfolio-item{
        max-width: 12.5% !important;
        padding: 15px !important;
    }
    #portfolio-flters li{
        font-size: 0.8em;
    }
    .kat .section-heading{
      font-size: 1.5rem;
    }
    .redirect-body {
        width: 500px;
        height: 250px;
        margin-left: -250px;
        margin-top: -125px;
    }
    .redirect-container .close-modal{
        transform: translate(225px, -25px);
    }
    .redirect-container h3{
        font-size: 5rem;
    }
    .redirect-container h2{
        font-size: 1.5rem;
    }
}
</style>