<script>
// import { RouterLink } from 'vue-router'
</script>
<template>
    <section class="page-section  flex-grow-1" id="home">
        <div class="container section-container">
            <div class="row home-title">
              <div class="col-md-12 text-white home-logo text-center" >
                <h3 class="" style="margin-tp:100px" >Selamat Datang Di</h3>
                <h2 class="home-title-1" >Mall Pelayanan Publik</h2>
                <h2 class="home-title-2" >Kabupaten Blitar</h2>
  
                <div class="mb-4"></div>
              <div style="display: inline-block;width: 250px;margin:0px auto">
              <img src="../assets/img/logo-circle.svg" alt="" />
              <!-- <RouterLink id="mulai" class="btn btn-primary home" style="position: relative; top: -175px" to="/layanan" >Mulai</RouterLink>  -->
              <a href="#/layanan" id="mulai" class="btn btn-primary home" style="position: relative; top: -175px" >Mulai</a>
              </div>
            </div>
          </div>
        </div>
      </section>
</template>

<style scoped>
.home-title-1{
    text-transform: uppercase;
    font-size: 2.5rem;
    color: var(--bs-primary);
  }
  .home-title-2{
    text-transform: uppercase;
    font-size: 2rem;
  }
  .btn.home{
      font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !important;
      background: #00000088;
      color: #fff;
      border: solid 2px var(--blitar-green);
      border-radius: 50%;
      width: 100px;
      height: 100px;
      padding: 33px 0px;
      text-align: center;
      /* margin-top: 30px; */
  }
  
  .btn.home:hover{
    background: var(--blitar-green);
    color: var(--bs-primary);
    font-weight: bold;
    border: solid 2px var(--blitar-green);
    box-shadow:  0px 0px 20px rgba(var(--blitar-green-rgb), 0.8);
  }

/*=========================mobile view=======================*/
@media (max-width: 768px){
    .home-title-1{
      font-size: calc(1.525rem + 0.9vw);
    }
    .home-title-2{
      font-size: calc(1.325rem + 0.9vw);
    }
  }  
</style>