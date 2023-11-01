<style scoped>
.bg-opacity-5 {
  backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.03);
}
</style>

<template>
  <div class=" fixed left-0 top-0  z-[100000] h-full w-full  bg-opacity-5" >
    <div
      class="pointer-events-auto flex items-center w-auto translate-y-[-50px] mx-auto mt-7 min-h-[calc(100%-3.5rem)] max-w-[600px]"  >
      <div class="  w-full min-w-full bg-white"  >
        <div class="max-w-4xl mx-auto p-0"  >
          <table class="w-full border border-gray-300"   >
             <div  >
            
            <tr class="border-b border-gray-300" >
      <td class="p-4 "  >
        <div  >
          <p class="font-semibold">Payment ID: {{ payment.payment_id}}</p>
          <span class="font-normal  text-xs">Description: {{ payment.description }}</span>
        </div>
        <div>
          <p class="font-normal text-lg leading-1.4">FROM</p>
          <p class="font-normal text-xs leading-1.4">{{ payment.account_name  }}</p>
        </div>
      </td>
    </tr>
      
               </div>
                <tr class="w-full">
                  <td
                    class="px-5 py-2 font-normal text-xs bg-gray-300 text-white border-t border-l border-b border-gray-300 w-1/10"
                    align="center">
                    Bill Number
                  </td>
                  <td
                    class="px-5 py-2 font-normal text-xs bg-gray-300 text-white border-t border-l border-b border-gray-300 w-2/10"
                    align="center">
                    Fee Type
                  </td>
                  <td
                    class="px-5 py-2 font-normal text-xs bg-gray-300 text-white border-t border-l border-b border-gray-300 w-3/10"
                    align="left">
                    Fee
                  </td>
                  <td
                    class="px-5 py-2 font-normal text-xs bg-gray-300 text-white border-t border-l border-b border-gray-300 w-2/10"
                    align="right">
                    Paid
                  </td>
                  <td
                    class="px-5 py-2 font-normal text-xs bg-gray-300 text-white border-t border-l border-r border-b border-gray-300 w-2/10"
                    align="right">
                       Total
                  </td>
                </tr>
                <tr  >
                  <td class="px-5 py-2 font-normal text-sm border-b border-gray-300" align="center">
                   {{ bill.bill_id }}
                  </td>
                  <td class="px-5 py-2 font-normal text-sm border-b border-gray-300" align="center">
                    {{ bill.description}}
                  </td>
                  <td class="px-5 py-2 font-normal text-sm border-b border-gray-300" align="left">
                   {{ bill.fee }}
                  </td>
                  <td class="px-5 py-2 font-normal text-sm border-b border-gray-300" align="right">
                   {{ bill.paid }}
                  </td>
                  <td class="px-5 py-2 font-normal text-sm border-b border-gray-300" align="right">
                   {{  parseFloat(bill.paid) - parseFloat(bill.fee)  }}
                  </td>
                </tr>

                <tr>
                  <td colspan="3" class="px-5 py-2 font-normal text-left text-lg border border-white bg-primary"></td>
                  <td colspan="2" class="px-5 py-2 font-normal text-right text-lg border border-white bg-primary"
                    align="right">
                    Grand Total
                  </td>
                  <td class="px-5 py-2 font-semibold text-right text-lg border border-white bg-primary text-white"
                    align="right">
                    0
                  </td>
                </tr>
        
            <tr class="align-top">
              <td class="h-20">
                &nbsp;
              </td>
            </tr>
            <tr class="align-top">
              <td class="flex justify-center" >

                  <VBtn class="bg-primary ">make payment</VBtn>  
              </td>
            </tr>
                </table>
                <div>{{ bill }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>


const props = defineProps({
  payment: Object,
  bill: Object,
})
console.log(props.payment)

</script>
