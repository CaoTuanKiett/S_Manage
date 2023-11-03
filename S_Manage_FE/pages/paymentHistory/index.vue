<style lang="scss">
// Container
.container {
  width: 600px;
  height: 400px;
  margin: 100px;
}

// Content
.transaction-content {
  width: 700px;
  height: 50px;
  padding: 20px;
  border-radius: 2px;
  background-color: white;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transform: scale(.9);
  transition: transform .8s cubic-bezier(.15, 1.10, .41, 1.3), background-color .8s ease-out, box-shadow .8s cubic-bezier(.15, 1.10, .41, 1.3);

  &.active {
    transform: scale(1);
    background-color: #fff;
    box-shadow: 0 6px 6px rgba(0, 0, 0, 0.15);
  }

  // Status  
  .status {
    height: 12px;
    width: 12px;
    background-color: #ddd;
    border-radius: 50%;
    transition: background-color .4s ease-out;
  }

  // Payment Method
  .payment-method {
    display: flex;
    align-items: center;
    width: 30%;

    img {
      margin-right: 10px;
    }
  }

  .message {
    width: 35%;
  }

  .price {
    width: 10%;
  }
}
</style>

<template>
  <div class=" m-auto  ">
    <div class="container ">
      <div class="transactions">

        <div class="transaction-content transaction1 relative" v-for="pay in paymentData.payments" :key="pay.payment_id">
          <div class="price">
            <p>${{ pay.amount_money }}</p>
          </div>
          <div class="payment-method">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/346994/mastercard_card.svg" />
            <p> {{ pay.account_name }}</p>
          </div>
          <div class="message">
            <p class=" ml-3">{{ pay.create_at.slice(0, 10) }}</p>
          </div>
          <VBtn class="bg-primary" @click="getPaymentDetail(pay.payment_id)">Details</VBtn>

        </div> 
        
        <div v-for=" (payments , i ) in paymentDetailData " :key="i" >
          <span v-for="bill in payments"  >
           <PaymentDetail :payment="payments.payment_info" :bill="bill"  @hideForm="toggleForm" />
          </span>

        </div>




      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const formID = ref(null)

const paymentData = ref([])
const paymentDetailData = ref([])

const toggleForm = () => {
  formID.value = null
}
const getPayments = async () => {
  try {
    const response = await axios.get('http://localhost:8080/payment/get-all-payments')
    if (response.data) {
      console.log(response.data)
      return paymentData.value = response.data
    }
  } catch (error) {
    console.log(error)
    return []
  }
}
const getPaymentDetail = async (payment_id) => {
  try {
    formID.value = payment_id
    const response = await axios.get(`http://localhost:8080/payment/get-payment-detail/${formID.value}`)
    if (response.data) {
      console.log(response.data)
      paymentDetailData.value = response.data
    }
  } catch (error) {
    console.log(error)
    return
  }
}
onMounted(async () => {
  await getPayments()

})
</script>
