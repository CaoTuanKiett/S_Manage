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
                    <button @click="handleOpenCreateBill"
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
                            <billForm :bill="bill" :users="users"></billForm>
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
                            <th class="px-6 bg-[#fafafa] text-start text-[#262626] font-normal">Create Date</th>
                            <th class="w-[10%] text-start text-[#262626] font-normal px-6 bg-[#fafafa]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(itemBill, index) in paginatedList" :key="index" class="h-[72px] hover:bg-gray-100">
                            <td class="px-6 border-b border-r border-[#f0f0f0] text-[#595959]">{{ itemBill.title }}</td>
                            <td class="px-6 border-b border-r border-[#f0f0f0] text-[#595959]">{{ itemBill.desc }}</td>
                            <td class="px-6 border-b border-r border-[#f0f0f0] text-[#595959]">{{ itemBill.createDate }}
                            </td>
                            <td class="px-6 border-b border-[#f0f0f0] text-[#595959] align-middle">
                                <button class="text-blue-500" @click="handleOpenEditBill(itemBill.id)"><font-awesome-icon
                                        :icon="['fas', 'edit']" /></button>
                                <Popup :is-open="openPopupsEditId[itemBill.id]"
                                    @update-is-open="handleCloseEditBill(itemBill.id)">
                                    <template #popup-header>
                                        <h2 class="text-2xl font-bold text-center text-blue-500">Edit Bill</h2>
                                    </template>
                                    <template #default>
                                        <billForm :bill="billEdit" :users="users"></billForm>
                                    </template>
                                    <template #popup-footer>
                                        <button @click="editBill(itemBill.id)"
                                            class="p-3 text-white bg-blue-500 rounded-md hover:bg-blue-400">
                                            Update
                                        </button>
                                    </template>
                                </Popup>
                                <button class="ml-3 text-red-500" @click="openDeleteBill(itemBill.id)"><font-awesome-icon
                                        :icon="['fas', 'trash-alt']" /></button>
                                <Popup :is-open="openPopupsDeleteId[itemBill.id]"
                                    @update-is-open="handleCloseDeleteBill(itemBill.id)" :type="'confirm'">
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
                                        <button @click="deleteBill(itemBill.id)"
                                            class="p-3 text-white bg-blue-500 rounded-md hover:bg-blue-400">
                                            Delete
                                        </button>
                                    </template>
                                </Popup>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="px-6 text-center pt-[30px] flex gap-3 align-center justify-center">
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
        </div>
    </NuxtLayout>
</template>

<script>
import { ref } from 'vue';
import Popup from '~/components/Popup.vue';
import billForm from '~/components/billForm.vue';

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
            bill: {
                title: '',
                desc: '',
                currentMonth: new Date().getMonth() + 1,
                currentYear: new Date().getFullYear(),
                amount: '',
                selected: [],
            },
            billEdit: {
                title: 'Tiền tháng 11',
                desc: 'tiền tháng 11 nè',
                currentMonth: 11,
                currentYear: 2023,
                amount: 2023,
                selected: [1, 2, 3, 5, 8, 10],
            },
            currentPage: 1,
            itemsPerPage: 8,
            users: [
                {
                    id: 1,
                    name: 'Frozen Yogurt',
                    departments: "IT",
                    join_year: 2020,
                },
                {
                    id: 2,
                    name: 'Ice cream sandwich',
                    departments: "MO",
                    join_year: 2021,
                },
                {
                    id: 3,
                    name: 'Eclair',
                    departments: "IT",
                    join_year: 2023,
                },
                {
                    id: 4,
                    name: 'Cupcake',
                    departments: "Designer",
                    join_year: 2023,
                },
                {
                    id: 5,
                    name: 'Gingerbread',
                    departments: "MO",
                    join_year: 2022,
                },
                {
                    id: 6,
                    name: 'Jelly bean',
                    departments: "IT",
                    join_year: 2020,
                },
                {
                    id: 7,
                    name: 'Lollipop',
                    departments: "Designer",
                    join_year: 2021,
                },
                {
                    id: 8,
                    name: 'Honeycomb',
                    departments: "IT",
                    join_year: 2023,
                },
                {
                    id: 9,
                    name: 'Donut',
                    departments: "IT",
                    join_year: 2022,
                },
                {
                    id: 10,
                    name: 'KitKat',
                    departments: "IT",
                    join_year: 2022,
                },
            ],
            listBill: [
                {
                    id: 1,
                    title: 'Tiền tháng 1',
                    desc: 'Điện nước',
                    createDate: '2021-09-30',
                },
                {
                    id: 2,
                    title: 'Tiền tháng 2',
                    desc: 'Điện nước',
                    createDate: '2021-09-30',
                },
                {
                    id: 3,
                    title: 'Tiền tháng 3',
                    desc: 'Điện nước',
                    createDate: '2021-09-30',
                },
                {
                    id: 4,
                    title: 'Tiền tháng 4',
                    desc: 'Điện nước',
                    createDate: '2021-09-30',
                },
                {
                    id: 5,
                    title: 'Tiền tháng 5',
                    desc: 'Điện nước',
                    createDate: '2021-09-30',
                },
                {
                    id: 6,
                    title: 'Tiền tháng 6',
                    desc: 'Điện nước',
                    createDate: '2021-09-30',
                },
                {
                    id: 7,
                    title: 'Tiền tháng 7',
                    desc: 'Điện nước',
                    createDate: '2021-09-30',
                },
                {
                    id: 8,
                    title: 'Tiền tháng 8',
                    desc: 'Điện nước',
                    createDate: '2021-09-30',
                },
                {
                    id: 9,
                    title: 'Tiền tháng 9',
                    desc: 'Điện nước',
                    createDate: '2021-09-30',
                },
                {
                    id: 10,
                    title: 'Tiền tháng 10',
                    desc: 'Điện nước',
                    createDate: '2021-09-30',
                },
            ]
        }
    },
    methods: {
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
        },
        handleCloseEditBill(id) {
            this.openPopupsEditId[id] = false;
        },
        createBill() {
            console.log({
                title: this.bill.title,
                desc: this.bill.desc,
                month: this.bill.currentMonth,
                year: this.bill.currentYear,
                amount: Number(this.bill.amount),
                for_user: this.bill.selected,
            })
            this.listBill.push({
                id: this.listBill.length + 1,
                title: this.bill.title,
                desc: this.bill.desc,
                createDate: new Date().toISOString().slice(0, 10),
            });
            this.isPopupOpen = false;
        },
        openDeleteBill(id) {
            this.openPopupsDeleteId[id] = true;
        },
        handleCloseDeleteBill(id) {
            this.openPopupsDeleteId[id] = false;
        },
        deleteBill(id) {
            this.listBill = this.listBill.filter(bill => bill.id !== id);
            this.handleCloseDeleteBill(id);
        }
    },
    mounted() {

    },
    computed: {
        sortedListBill() {
            return this.listBill.sort((a, b) => b.id - a.id);
        },
        filteredList() {
            return this.sortedListBill.filter(itemBill => {
                return itemBill.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    itemBill.desc.toLowerCase().includes(this.searchQuery.toLowerCase());
            });
        },
        totalPages() {
            return Math.ceil(this.sortedListBill.length / this.itemsPerPage);
        },
        paginatedList() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.filteredList.slice(startIndex, endIndex);
        }
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
</style>