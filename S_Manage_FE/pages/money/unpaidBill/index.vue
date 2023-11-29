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
                        <table class="border-collapse table-auto w-100">
                            <thead>
                                <tr class="h-11">
                                    <th class="px-6 bg-[#fafafa] text-start text-[#262626] font-normal">Title</th>
                                    <th class="px-6 bg-[#fafafa] text-start text-[#262626] font-normal">Description</th>
                                    <th class="px-6 bg-[#fafafa] text-start text-[#262626] font-normal">Amount</th>
                                    <th class="w-[10%] text-start text-[#262626] font-normal px-6 bg-[#fafafa]">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(unpaidBill, index) in filteredUnpaidBills" :key="index"
                                    class="h-[72px] hover:bg-gray-100">
                                    <td class="px-6 border-b border-r border-[#f0f0f0] text-[#595959]">{{
                                        unpaidBill.fee_type
                                    }}
                                    </td>
                                    <td class="px-6 border-b border-r border-[#f0f0f0] text-[#595959]">{{
                                        unpaidBill.description }}
                                    </td>
                                    <td class="px-6 border-b border-r border-[#f0f0f0] text-[#595959]">{{
                                        unpaidBill.unpaid_fee }}
                                    </td>
                                    <td class="px-6 border-b border-[#f0f0f0] text-[#595959] align-middle text-center">
                                        <label for="" class="flex justify-center w-5 h-5 m-auto align-center">
                                            <input ref="checkPayment" type="checkbox" class="cursor-pointer w-100 h-100"
                                                @change="addPayment($event, unpaidBill.bill_id, unpaidBill.description, unpaidBill.unpaid_fee, unpaidBill.month)">
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
import axios from 'axios';
// import useDecodeTokenStore from '@/stores/decodeToken';
export default {
    mounted() {
        const accessToken = localStorage.getItem('accessToken');
        const base64Url = accessToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );
        const user = JSON.parse(jsonPayload);
        console.log(user.idUser);
        this.userId = user.idUser;
        this.getUnpaidBill(user.idUser);
    },
    data() {
        return {
            // unpaidBills: [],
            searchQuery: '',
            payment: [],
            currentPage: 1,
            itemsPerPage: 8,
            unpaidBills: [],
            userId: null,
        }
    },
    methods: {
        async getUnpaidBill(id) {
            try {
                const response = await axios.get(`${this.$config.public.API_BASE_BE}/api/v1/payment/get-unpaid-bill/${id}`);
                console.log(response);
                if (response.status === 200) {
                    this.unpaidBills = response.data.unpaidBills;
                }
            } catch (error) {
                console.log(error);
            }
        },
        paidBill(payer) {
            console.log(payer)
        },
        addPayment(event, bill_id, description, price, month) {
            if (event.target.checked) {
                this.payment.push({
                    bill_id,
                    description,
                    price: parseInt(price),
                    month
                });
            } else {
                const paymentIndex = this.payment.findIndex(item => item.bill_id === bill_id);
                if (paymentIndex !== -1) {
                    this.payment.splice(paymentIndex, 1);
                }
            }
        },
        async createPayment() {
            try {
                const response = await axios.post(`${this.$config.public.API_BASE_BE}/api/v1/payment/stripe-checkout`, {
                    "user_id": this.userId,
                    "description": "Thanh toán tiền tháng",
                    "items": this.payment,
                });
                console.log(response);
                if (response.status === 200) {
                    this.payment = [];
                    window.location.href = response.data;
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    computed: {
        filteredUnpaidBills() {
            return this.unpaidBills.filter((unpaidBill) => {
                return unpaidBill.fee_type.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    unpaidBill.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    unpaidBill.unpaid_fee.toString().includes(this.searchQuery.toLowerCase())
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