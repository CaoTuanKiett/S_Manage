<template>
    <NuxtLayout name="custom">
        <div>
            <h1 class="mb-[24px] text-2xl font-bold text-blue-500">Monthly Money</h1>
            <div class="flex flex-col w-full pb-4 bg-white rounded-lg shadow-md">
                <div class="flex flex-col gap-3 px-6 py-4">
                    <div class="flex justify-end w-full gap-10">
                        <form action="" method="GET" class="w-[400px]">
                            <div class="relative w-[100%]">
                                <input v-model="searchQuery" type="text" id="search_money" name="search_money"
                                    placeholder="Search"
                                    class="w-full px-12 bg-white border py-[10px] rounded-[4px] focus:outline-none focus:border-blue-500">
                                <font-awesome-icon :icon="['fas', 'search']"
                                    class="absolute top-[50%] left-4 translate-y-[-50%]" />
                            </div>
                        </form>
                        <button class="text-black">
                            Sort by
                            <font-awesome-icon :icon="['fas', 'sort']" class="text-xs" />
                        </button>
                    </div>
                    <button v-if="isCreateBill"  @click="handleOpenCreateBill"
                        class="flex justify-center gap-2 font-medium bg-transparent rounded-lg align-self-end align-center">
                        <span class="text-blue-500">Create Bill</span>
                        <font-awesome-icon :icon="['fas', 'plus']"
                            class="p-1 text-xs font-bold text-white bg-blue-500 rounded-sm" />
                    </button>
                    <Popup :is-open="isPopupOpen" @update-is-open="isPopupOpen = $event">
                        <template #popup-header>
                            <h2 class="text-2xl font-bold text-center text-blue-500">Create Bill</h2>
                        </template>
                        <template #default>
                            <billForm :bill="bill" :users="listUser"></billForm>
                        </template>
                        <template #popup-footer>
                            <button @click="createBill" class="p-3 text-white bg-blue-500 rounded-md hover:bg-blue-400">
                                Create
                            </button>
                        </template>
                    </Popup>
                </div>
                <div v-if="filteredList.length === 0" class="min-h-[60vh] flex align-center justify-center">
                    Không có bill nào!
                </div>
                <table v-else class="border-collapse table-auto">
                    <thead>
                        <tr class="h-11">
                            <th class="px-6 bg-[#fafafa] text-start text-[#262626] font-normal">Title</th>
                            <th class="px-6 bg-[#fafafa] text-start text-[#262626] font-normal">Description</th>
                            <th class="px-6 bg-[#fafafa] text-start text-[#262626] font-normal">Amount</th>
                            <th class="px-6 bg-[#fafafa] text-start text-[#262626] font-normal">Username</th>
                            <th class="px-6 bg-[#fafafa] text-start text-[#262626] font-normal">Create Date</th>
                            <th class="w-[10%] text-start text-[#262626] font-normal px-6 bg-[#fafafa]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(itemBill) in paginatedList" :key="itemBill.bill_id"
                            class="h-[72px] hover:bg-gray-100">
                            <td class="px-6 border-b border-r border-[#f0f0f0] text-[#595959]">{{ itemBill.fee_type }}</td>
                            <td class="px-6 border-b border-r border-[#f0f0f0] text-[#595959]">{{ itemBill.description }}
                            </td>
                            <td class="px-6 border-b border-r border-[#f0f0f0] text-[#595959]">{{ itemBill.fee }}
                            </td>
                            <td class="px-6 border-b border-r border-[#f0f0f0] text-[#595959]">{{ itemBill.name }}
                            </td>
                            <td class="px-6 border-b border-r border-[#f0f0f0] text-[#595959]">{{
                                formatDate(itemBill.create_at) }}
                            </td>
                            <td class="px-6 border-b border-[#f0f0f0] text-[#595959] align-middle">
                                <div class="text-center w-100">
                                    <button v-if="isUpdateBill" class="text-blue-500"
                                        @click="handleOpenEditBill(itemBill.bill_id)"><font-awesome-icon
                                            :icon="['fas', 'edit']" /></button>
                                    <Popup :is-open="openPopupsEditId[itemBill.bill_id]"
                                        @update-is-open="handleCloseEditBill(itemBill.bill_id)">
                                        <template #popup-header>
                                            <h2 class="text-2xl font-bold text-center text-blue-500">Edit Bill for {{
                                                itemBill.name }}</h2>
                                        </template>
                                        <template #default>
                                            <billForm :bill="billEdit"></billForm>
                                        </template>
                                        <template #popup-footer>
                                            <button @click="editBill(itemBill.bill_id)"
                                                class="p-3 text-white bg-blue-500 rounded-md hover:bg-blue-400">
                                                Update
                                            </button>
                                        </template>
                                    </Popup>
                                    <button v-if="isDeleteBill" class="ml-3 text-red-500"
                                        @click="openDeleteBill(itemBill.bill_id)"><font-awesome-icon
                                            :icon="['fas', 'trash-alt']" /></button>
                                    <Popup :is-open="openPopupsDeleteId[itemBill.bill_id]"
                                        @update-is-open="handleCloseDeleteBill(itemBill.bill_id)" :type="'confirm'">
                                        <template #popup-header>
                                            <h2 class="text-2xl font-bold text-center text-blue-500">
                                                Want to delete this bill?
                                            </h2>
                                        </template>
                                        <template #default>
                                            <!-- <billForm :bill="bill" :users="users"></billForm> -->
                                            Once deleted, it cannot be undone. Do you confirm deletion?
                                        </template>
                                        <template #popup-footer>
                                            <button @click="deleteBill(itemBill.bill_id)"
                                                class="p-3 text-white bg-blue-500 rounded-md hover:bg-blue-400">
                                                Delete
                                            </button>
                                        </template>
                                    </Popup>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="filteredList.length > 0"
                    class="px-6 text-center pt-[30px] flex gap-3 align-center justify-center">
                    <!-- <v-pagination v-model="page" :length="8" :total-visible="5"></v-pagination> -->
                    <button class="px-3 py-1 bg-gray-100 rounded-md" :class="currentPage === 1 ? 'invisible' : 'visible'"
                        @click="currentPage > 1 ? currentPage-- : currentPage = 1">Previous</button>

                    <span v-for="pageNumber in totalPages" :key="pageNumber">
                        <button class="px-3 py-1 rounded-md"
                            :class="currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-100'"
                            @click="currentPage = pageNumber">{{ pageNumber }}</button>
                    </span>

                    <button class="px-3 py-1 bg-gray-100 rounded-md"
                        :class="currentPage === totalPages ? 'invisible' : 'visible'"
                        @click="currentPage < totalPages ? currentPage++ : currentPage = totalPages">Next</button>
                </div>
            </div>
            <div v-if="isLoading" class="loading-overlay">
                <div class="loader"></div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script>
import { ref } from 'vue';
import Popup from '~/components/Popup.vue';
import billForm from '~/components/billForm.vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { useBillStore } from '@/stores/bill';

import { useDecodeTokenStore } from '#imports';
const decoded = useDecodeTokenStore()
decoded.decodeToken

const role_id = decoded.decoded.role
console.log("role_id", role_id);



export default {
    components: {
        Popup,
        billForm
    },
    data() {
        return {
            isPopupOpen: false,
            openPopupsEditId: {},
            openPopupsDeleteId: {},
            searchQuery: '',
            dialog: false,
            userId: null,
            isLoading: false,
            bill: {
                title: '',
                desc: '',
                currentMonth: new Date().getMonth() + 1,
                currentYear: new Date().getFullYear(),
                amount: '',
                selected: [],
            },
            billEdit: {
                title: '',
                desc: '',
                currentMonth: 11,
                currentYear: 2023,
                amount: 2023,
                selected: [],
            },
            currentPage: 1,
            itemsPerPage: 8,
            // users: [
            //     {
            //         id: 41,
            //         name: 'Frozen Yogurt',
            //         departments: "IT",
            //         join_year: 2020,
            //     },
            //     {
            //         id: 2,
            //         name: 'Ice cream sandwich',
            //         departments: "MO",
            //         join_year: 2021,
            //     },
            //     {
            //         id: 3,
            //         name: 'Eclair',
            //         departments: "IT",
            //         join_year: 2023,
            //     },
            //     {
            //         id: 4,
            //         name: 'Cupcake',
            //         departments: "Designer",
            //         join_year: 2023,
            //     },
            //     {
            //         id: 5,
            //         name: 'Gingerbread',
            //         departments: "MO",
            //         join_year: 2022,
            //     },
            //     {
            //         id: 6,
            //         name: 'Jelly bean',
            //         departments: "IT",
            //         join_year: 2020,
            //     },
            //     {
            //         id: 7,
            //         name: 'Lollipop',
            //         departments: "Designer",
            //         join_year: 2021,
            //     },
            //     {
            //         id: 8,
            //         name: 'Honeycomb',
            //         departments: "IT",
            //         join_year: 2023,
            //     },
            //     {
            //         id: 9,
            //         name: 'Donut',
            //         departments: "IT",
            //         join_year: 2022,
            //     },
            //     {
            //         id: 10,
            //         name: 'KitKat',
            //         departments: "IT",
            //         join_year: 2022,
            //     },
            //     {
            //         id: 11,
            //         name: 'Honda',
            //         departments: "MO",
            //         join_year: 2022,
            //     },
            //     {
            //         id: 12,
            //         name: 'Yamaha',
            //         departments: "Designer",
            //         join_year: 2022,
            //     },
            //     {
            //         id: 13,
            //         name: 'Vision',
            //         departments: "IT",
            //         join_year: 2022,
            //     },
            //     {
            //         id: 14,
            //         name: 'Element',
            //         departments: "MO",
            //         join_year: 2023,
            //     },
            //     {
            //         id: 15,
            //         name: 'Panasonic',
            //         departments: "MO",
            //         join_year: 2023,
            //     },

            // ],
            listBill: [],
            listUser: [],
            isDeleteBill : false,
            isUpdateBill : false,
            isViewBill : false,
            isCreateBill : false,
        }
    },
    methods: {
        async getAllBill() {
            try {
                const res = await axios.get(`${this.$config.public.API_BASE_BE}/api/v1/payment/bill`);
                if (res.status === 200) {
                    const billStore = useBillStore();
                    billStore.setBills(res.data.bill);
                    this.listBill = billStore.$state.listBill;
                   
                }
            } catch (err) {
                console.log(err);
            }
        },
        async getBillById(id) {
            try {
                const res = await axios.get(`${this.$config.public.API_BASE_BE}/api/v1/payment/bill/${id}`);
                console.log(res);
                if (res.status === 200) {
                    this.billEdit.title = res.data[0].fee_type;
                    this.billEdit.desc = res.data[0].description;
                    this.billEdit.currentMonth = res.data[0].month;
                    this.billEdit.currentYear = res.data[0].year;
                    this.billEdit.amount = res.data[0].fee;
                    this.billEdit.selected = res.data[0].payer;
                }
            } catch (err) {
                console.log(err);
            }
        },
        handleOpenCreateBill() {
            this.isPopupOpen = true;
            this.bill = {
                title: '',
                desc: '',
                currentMonth: new Date().getMonth() + 1,
                currentYear: new Date().getFullYear(),
                amount: '',
                selected: [],
            };
        },
        handleOpenEditBill(id) {
            this.openPopupsEditId[id] = true;
            this.getBillById(id);
        },
        handleCloseEditBill(id) {
            this.openPopupsEditId[id] = false;
        },
        async createBill() {
            this.isLoading = true;
            const toast = useToast();
            await axios.post(`${this.$config.public.API_BASE_BE}/api/v1/payment/create-bill`, {
                fee_type: this.bill.title,
                description: this.bill.desc,
                month: this.bill.currentMonth,
                year: this.bill.currentYear,
                fee: Number(this.bill.amount),
                payers: this.bill.selected,
                create_by: this.userId,
            })
                .then(res => {
                    // console.log(res);
                    if (res.status === 200) {
                        this.isPopupOpen = false;
                        toast.success(res.data.message);
                        this.getAllBill();
                    }
                })
                .catch(err => {
                    console.log(err);
                    toast.error('Create bill failed!');
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        async editBill(id) {
            try {
                const res = await axios.put(`${this.$config.public.API_BASE_BE}/api/v1/payment/bill/${id}`, {
                    fee_type: this.billEdit.title,
                    description: this.billEdit.desc,
                    month: this.billEdit.currentMonth,
                    year: this.billEdit.currentYear,
                    fee: Number(this.billEdit.amount),
                    payer: this.billEdit.payer,
                });
                if (res.status === 200) {
                    const toast = useToast();
                    toast.success(res.data.message);
                    this.handleCloseEditBill(id);
                    this.getAllBill();
                }
            } catch (err) {
                console.log(err);
            }
        },
        openDeleteBill(id) {
            this.openPopupsDeleteId[id] = true;
        },
        handleCloseDeleteBill(id) {
            this.openPopupsDeleteId[id] = false;
        },
        async deleteBill(id) {
            // this.listBill = this.listBill.filter(bill => bill.id !== id);
            await axios.delete(`${this.$config.public.API_BASE_BE}/api/v1/payment/bill/${id}`)
                .then(res => {
                    if (res.status === 200) {
                        const toast = useToast();
                        toast.success(res.data.message);
                        this.handleCloseDeleteBill(id);
                        this.getAllBill();
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        formatDate(isoString) {
            let date = new Date(isoString);
            return date.toISOString().split('T')[0];
        },
        async featchDataUser() {
            const response = await axios.get(`${this.$config.public.API_BASE_BE}/api/v1/users`);
            console.log(response.data);
            return this.listUser = response.data;
        },
        async getPermision() {
            const response = await axios.get(`${this.$config.public.API_BASE_BE}/api/v1/author/${role_id}/get_permissions/`);
            const permissionsData = response.data.permissions;

            console.log("permissionsData", permissionsData);

           for(let i = 0; i < permissionsData.length; i++) {
                if(permissionsData[i].id_permission === 5) {
                    this.isCreateBill = true;
                }

                if(permissionsData[i].id_permission === 6) {
                    this.isDeleteBill = true;
                }

                if(permissionsData[i].id_permission === 7) {
                    this.isUpdateBill = true;
                }

                if(permissionsData[i].id_permission === 8) {
                    this.isViewBill = true;
                }
           }

           console.log(this.isCreateBill,  this.isDeleteBill, this.isUpdateBill, this.isViewBill );
           

            return permissionsData
            
        }
    },
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

        this.getAllBill();

        this.featchDataUser();

        this.getPermision();
        
        
    },
    computed: {
        sortedListBill() {
            return this.listBill.sort((a, b) => b.id - a.id);
        },
        filteredList() {
            return this.listBill.filter(itemBill => {
                return itemBill.fee_type.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    itemBill.description.toLowerCase().includes(this.searchQuery.toLowerCase());
            });
        },
        totalPages() {
            return Math.ceil(this.sortedListBill.length / this.itemsPerPage);
        },
        paginatedList() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.filteredList.slice(startIndex, endIndex);
        },
        
        
    }
}
</script>

<style>
.v-chip {
    display: flex;
    max-width: 80px;
    justify-content: center;
    align-items: center;
}

.v-field__field {
    background: #fff !important;
}

.loading-overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
}

.loader {
    border: 4px solid #f3f3f3;
    border-radius: 50%;
    border-top: 4px solid #3498db;
    width: 30px;
    height: 30px;
    -webkit-animation: spin 2s linear infinite;
    /* Safari */
    animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>