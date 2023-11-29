<style scoped>
.bg-opacity-5 {
  backdrop-filter: blur(8px);
}
</style>

<template>
  <div
    class="overflow-x-hidden overflow fixed z-[10000] h-full w-full inset-0 flex justify-center items-center bg-opacity-5">
    <div class="relative my-6 bg-white border border-gray-50 w-auto mx-auto max-w-6xl">
      <div class="p-4">
        <p class="font-semibold">Payment ID: {{ payment.payment_id }}</p>
        <span class="font-normal text-xs">Description: {{ payment.description }}</span>
        <p class="font-normal text-lg leading-1.4">FROM</p>
        <p class="font-normal text-xs leading-1.4">{{ payment.account_name }}</p>
      </div>
      <table class="w-full px-20 table-auto border">
        <thead class="py-4 w-full h-full">
          <tr class="px-8 py-3  ">
            <th
              class="px-5 py-3 font-normal text-xs bg-gray-300 text-white border-gray-300 w-screen"
              v-for="col in tableColumn" :key="col">
              {{ col }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class=" py-2 font-normal text-sm border-b border-gray-300" align="center">
              {{ bill.bill_id }}
            </td>
            <td class=" py-2 font-normal text-sm border-b border-gray-300" align="center">
              {{ bill.description }}
            </td>
            <td class=" pl py-2 font-normal text-sm border-b border-gray-300" align="center">
              {{ bill.fee }}
            </td>
            <td class="px-5 py-2 font-normal text-sm border-b border-gray-300" align="center">
              {{ bill.paid }}
            </td>
            <td class="px-5 py-2 font-normal text-sm border-b border-gray-300" align="center">
              {{ parseFloat(bill.paid) - parseFloat(bill.fee) }}
            </td>
          </tr>

          <tr>
            <td colspan="3" class="px-5 py-2 font-normal text-left text-lg border border-white bg-primary"></td>
            <td colspan="2" class="px-5 py-2 font-normal text-right text-lg border border-white bg-primary" align="right">
              Grand Total
            </td>
            <td class="px-5 py-2 font-semibold text-right text-lg border border-white bg-primary text-white"
              align="right">
              {{ grandTotal }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="h-20"></div>
      <div class="flex justify-center">
        <VBtn @click="$emit('hideForm')" class="bg-primary">Close</VBtn>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  payment: Object,
  bill: Object,

})
const tableColumn = ["Bill Number", "Fee Type", "Fee", "Paid", "Total"];

const grandTotal = computed(() => parseFloat(props.bill.paid) - parseFloat(props.bill.fee))

</script>
