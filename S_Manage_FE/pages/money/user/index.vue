<template>
    <NuxtLayout name="custom">
        <div>
            <h1 class="mb-[24px] text-2xl font-bold text-blue-500">List Bill Unpaid</h1>
            <div class="flex flex-col w-full bg-white rounded-lg shadow-md">
                <div class="flex flex-col gap-3 pt-8">
                    <div class="flex justify-end w-full gap-10 px-6">
                        <form action="" method="GET" class="w-[400px]">
                            <div class="relative w-[100%]">
                                <input v-model="searchQuery" type="text" id="search_money" name="search_money"
                                    placeholder="Search"
                                    class="w-full px-12 bg-white border py-[10px] rounded-[4px] focus:outline-none focus:border-blue-500">
                                <font-awesome-icon :icon="['fas', 'search']"
                                    class="absolute top-[50%] left-4 translate-y-[-50%]" />
                            </div>
                        </form>
                        <!-- <button class="text-black">
                            Sort by
                            <font-awesome-icon :icon="['fas', 'sort']" class="text-xs" />
                        </button> -->
                        <button
                            class="px-3 py-2 text-white bg-blue-500 rounded-lg min-w-[80px] hover:bg-blue-400 justify-self-end"
                            @click="createPayment()"
                            :class="payment.length === 0 ? 'pointer-events-none cursor-not-allowed bg-gray-500 hover:bg-gray-500' : ''">
                            Paid </button>
                    </div>
                    <div v-if="filteredUnpaidBills.length === 0" class="min-h-[60vh] flex align-center justify-center">
                        Không có bill nào!
                    </div>
                    <div v-else class="min-h-[60vh] mt-6">
                        <!-- <ul class="flex flex-col">
                            <li v-for="unpaidBill in filteredUnpaidBills" :key="index" class="min-w-[24%]">
                                <div
                                    class="flex flex-col gap-3 px-6 py-4 bg-gray-100 rounded-lg shadow-md align-center hover:shadow-lg">
                                    <h2 class="text-blue-500">
                                        {{ unpaidBill.fee_type }}
                                    </h2>
                                    <p class="text-sm text-gray-500 font-italic">
                                        {{ unpaidBill.description }}
                                    </p>
                                    <button
                                        class="px-3 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-400 w-100 justify-self-end"
                                        @click="paidBill(unpaidBill.payer)">
                                        Paid
                                    </button>
                                </div>
                            </li>
                        </ul> -->
                        <table class="border-collapse table-auto w-100">
                            <thead>
                                <tr class="h-11">
                                    <th class="px-6 bg-[#fafafa] text-start text-[#262626] font-normal">Title</th>
                                    <th class="px-6 bg-[#fafafa] text-start text-[#262626] font-normal">Description</th>
                                    <th class="w-[10%] text-start text-[#262626] font-normal px-6 bg-[#fafafa]">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- <tr class="h-[72px] hover:bg-gray-100">
                            <td class="px-6 border-b border-r border-[#f0f0f0] text-[#595959]">Tiền tháng 1</td>
                            <td class="px-6 border-b border-r border-[#f0f0f0] text-[#595959]">Điện nước</td>
                            <td class="px-6 border-b border-r border-[#f0f0f0] text-[#595959]">2021-09-30</td>
                            <td class="px-6 border-b border-[#f0f0f0] text-[#595959] align-middle">
                                <button class="text-blue-500"><font-awesome-icon :icon="['fas', 'edit']" /></button>
                                <button class="ml-3 text-red-500"><font-awesome-icon
                                        :icon="['fas', 'trash-alt']" /></button>
                            </td>
                        </tr> -->
                                <tr v-for="(unpaidBill, index) in unpaidBills" :key="index"
                                    class="h-[72px] hover:bg-gray-100">
                                    <td class="px-6 border-b border-r border-[#f0f0f0] text-[#595959]">{{
                                        unpaidBill.fee_type
                                    }}
                                    </td>
                                    <td class="px-6 border-b border-r border-[#f0f0f0] text-[#595959]">{{
                                        unpaidBill.description }}
                                    </td>
                                    <td class="px-6 border-b border-[#f0f0f0] text-[#595959] align-middle text-center">
                                        <label for="" class="flex justify-center w-5 h-5 m-auto align-center">
                                            <input ref="checkPayment" type="checkbox" class="cursor-pointer w-100 h-100"
                                                @change="addPayment($event, unpaidBill.bill_id, unpaidBill.description, unpaidBill.unpaid_fee)">
                                        </label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script>
export default {
    data() {
        return {
            // unpaidBills: [],
            searchQuery: '',
            payment: [],
            currentPage: 1,
            itemsPerPage: 8,
            unpaidBills: [
                {
                    "bill_id": 3,
                    "fee_type": "MonthFee 8",
                    "unpaid_fee": "80.00",
                    "description": "MonthFee 8",
                    "payer": 2
                },
                {
                    "bill_id": 4,
                    "fee_type": "MonthFee 10",
                    "unpaid_fee": "500.00",
                    "description": "MonthFee 8",
                    "payer": 2
                },
                {
                    "bill_id": 13,
                    "fee_type": "MonthFee 11",
                    "unpaid_fee": "200.00",
                    "description": "MonthFee 11",
                    "payer": 2
                },
                {
                    "bill_id": 19,
                    "fee_type": "MonthFee 13",
                    "unpaid_fee": "200000.00",
                    "description": "MonthFee 13",
                    "payer": 2
                },
                {
                    "bill_id": 27,
                    "fee_type": "MonthFee 7",
                    "unpaid_fee": "200000.00",
                    "description": "MonthFee 7",
                    "payer": 2
                },
                {
                    "bill_id": 31,
                    "fee_type": "MonthFee 7",
                    "unpaid_fee": "200000.00",
                    "description": "MonthFee 7",
                    "payer": 2
                },
                {
                    "bill_id": 39,
                    "fee_type": "MonthFee 7",
                    "unpaid_fee": "200000.00",
                    "description": "MonthFee 7",
                    "payer": 2
                },
                {
                    "bill_id": 40,
                    "fee_type": "MonthFee 7",
                    "unpaid_fee": "250000.00",
                    "description": "MonthFee 7",
                    "payer": 2
                },
                {
                    "bill_id": 45,
                    "fee_type": "MonthFee 7",
                    "unpaid_fee": "350000.00",
                    "description": "MonthFee 7",
                    "payer": 2
                },
            ]
        }
    },
    methods: {
        paidBill(payer) {
            console.log(payer)
        },
        addPayment(event, bill_id, description, price) {
            if (event.target.checked) {
                this.payment.push({
                    bill_id,
                    description,
                    price
                });
            } else {
                const paymentIndex = this.payment.findIndex(item => item.bill_id === bill_id);
                if (paymentIndex !== -1) {
                    this.payment.splice(paymentIndex, 1);
                }
            }
        },
        createPayment() {
            const data = {
                "user_id": 2,
                "description": "Thanh toán tiền tháng",
                "items": this.payment,
            }
            console.log(data)
        }
    },
    computed: {
        filteredUnpaidBills() {
            return this.unpaidBills.filter((unpaidBill) => {
                return unpaidBill.fee_type.toLowerCase().includes(this.searchQuery.toLowerCase())
            })
        },
        totalPages() {
            return Math.ceil(this.unpaidBills.length / this.itemsPerPage);
        },
        paginatedList() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.filteredUnpaidBills.slice(startIndex, endIndex);
        }
    }
}
</script>

<style scoped></style>