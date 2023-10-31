<script setup>
  import { defineProps, ref, onMounted } from 'vue';

  const { DataBill } = defineProps(['DataBill']);
  const twelveMonths = ref([]);

  onMounted(() => {
  // Xử lý dữ liệu từ DataBill
  if (DataBill) {
    console.log(DataBill);
    for (let month = 1; month <= 12; month++) {
      const monthData = DataBill[month]; 
      console.log(monthData);
      twelveMonths.value.push({
        idMonth: month, 
        isChecked: monthData ? monthData.bill_status == 'paid' : false, 
        isUnpaid: monthData ? monthData.bill_status == 'unpaid' : false,
        isUnCharge: monthData ? monthData.bill_status == 'unchanged' : false,
      });
    }
  }
});


</script>

<template>
  <div >
    <tr class="flex justify-around border-0">
    <td  
      
      v-for="monthData in twelveMonths" :key="monthData.idMonth">
      <CheckBoxItem
        :idMonth="monthData.idMonth"
        :isChecked="monthData.isChecked"
        :isUnpaid="monthData.isUnpaid"
        :isUnCharge="monthData.isUnCharge"
      />
    </td>
  </tr>
  </div>
</template>