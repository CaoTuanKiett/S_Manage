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

// Transitions
.transaction1 {
  transition-delay: 1s;
  &.active .status {
    transition-delay: 2s;
    background-color: #5ACC35;
  }
}
.transaction-content:not(.transaction1) {
  position: relative;
  z-index: -1;
}


</style>

<template>
    <div class=" m-auto  "   >
    <div class="container flex " >
        <div class="transactions">
          <tbody :class="{'-z-[1000]': formID !== null }" >
          <div  class="transaction-content transaction1 relative" v-for="pay in paymentData.payments" :key="pay.payment_id"   >
            <div class="price">
              <p>${{pay.amount_money}}</p>
            </div>
            <div class="payment-method">
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/346994/mastercard_card.svg"/>
              <p> {{ pay.account_name}}</p>
            </div>
            <div class="message">
              <p class=" ml-3" >{{ pay.create_at.slice(0, 10)}}</p>
            </div>
            <VBtn class="bg-primary" @click="consoleID(pay)" >{{ pay.payment_id }}</VBtn>

           <div v-show="pay.payment_id === formID">
                <div v-for="(payments, i) in paymentDetailData" :key="i" >
                  <span v-for="payment in payments.payment_info" :key="payment.payment_id">
                    <span v-for="bill in payments.bill_details" :key="bill.bill_id">
                      <PaymentDetail :payment="payment" :bill="bill" />
                    </span>
                  </span>
                </div>
              </div>
          </div>
            </tbody>
        </div>
    </div>  
      </div>
   
</template>

<script setup>
import axios from 'axios';
import {onMounted, ref} from 'vue';

const formID = ref(null)

const paymentData = ref([])
const paymentDetailData =ref([])

const consoleID = (pay) => {
     formID.value = pay.payment_id
  console.log(formID.value)
}
const getPayments = async () => {
  try {
    const response = await axios.get('http://localhost:8080/payment/get-all-payments')
    if(response.data){
      console.log(response.data)
     return paymentData.value = response.data
    }
  } catch (error) {
    console.log(error)
    return []
  }
}

const getPaymentDetail = async () => {
  try {
    const response = await axios.get('http://localhost:8080/payment/get-payment-detail')
    if (response.data) {
      console.log(response.data)
      return paymentDetailData.value = response.data
    }
  } catch (error) {
    console.log(error)
    return []
  }
}
onMounted(async () =>{
  await getPayments()
  await getPaymentDetail()
})
</script>
