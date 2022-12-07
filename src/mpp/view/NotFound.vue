<template>
    <div class="loader-body" >
        <div class="loader-container text-center">
            <h3 style="margin-top: 15px">Halaman Tidak Ditemukan</h3>
            <a class="go-back" href="#/" >Kembali</a> 
        </div> 
    </div>
</template>

<style scoped>
.loader-body {
	min-height: 100vh;
	width: 100%;
	display: flex;
	background-color: #fff;
}
.loader-container {
	/*align-items: center;
	display: flex;*/
	margin: auto;
    color: var(--bs-body-color);
}
a{
    text-decoration: none;
    color: black;
}

</style>