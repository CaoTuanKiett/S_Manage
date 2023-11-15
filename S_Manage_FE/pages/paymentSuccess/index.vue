<style lang="scss">
$primBlue: #0073ff;
$white: #fff;
$blueGray: #607d8b;
$slate: #54617a;


$bariol: 'bariolregular';
$roboto: 'Roboto', sans-serif;

.payment-success {
  width: 410px;
  box-shadow: 0 13px 45px 0 rgba(51, 59, 69, 0.1);
  margin: auto;
  border-radius: 10px;
  text-align: center;
  position: relative;
  font-family: $roboto;

  .header {
    position: relative;
    height: 7px;
  }

  .body {
    padding: 0 50px;
    padding-bottom: 25px;
  }

  .close {
    position: absolute;
    color: $primBlue;
    font-size: 20px;
    right: 15px;
    top: 11px;
    cursor: pointer;
  }

  .title {
    font-family: $bariol;
    font-size: 32px;
    color: $slate;
    font-weight: normal;
    margin-bottom: 10px;
  }

  .main-img {
    width: 243px;
  }

  p {
    font-size: 13px;
    color: $blueGray;
  }

  .btn {
    border: none;
    border-radius: 100px;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    outline: none;
    cursor: pointer;
    position: relative;

    &.btn-primary {
      background: $primBlue;
      color: $white;
    }
  }

  .cancel {
    text-decoration: none;
    font-size: 14px;
    color: $blueGray;
  }
}
</style>
<template>
  <div class="payment-success bg-background ">
    <div class="header">
      <i class="ion-close-round close"></i>
    </div>
    <div class="body">
      <h2 class="title">Payment Successful</h2>
      <img class="main-img" src="https://res.cloudinary.com/dw1zug8d6/image/upload/v1542777688/group-3_3x.png" alt="">
      <p>Your payment was successful! You can <br>
        now continue using Artycoin.</p>
      <VBtn class="btn btn-primary" @click="changeRoute()">
        Continue
      </VBtn>

    </div>
  </div>
</template>

<script setup>
const router = useRouter()

const changeRoute = () => {
  router.push('/money/unpaidBill')
}
</script>