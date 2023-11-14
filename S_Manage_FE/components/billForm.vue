<template>
    <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
            <label class="text-start" for="title">Title</label>
            <input type="text" id="title" name="title" placeholder="Title"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                v-model="bill.title" v-focus>
        </div>
        <div class="flex flex-col gap-2">
            <label class="text-start" for="description">Description</label>
            <textarea type="text" id="description" name="description" placeholder="Description"
                class="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500 min-h-[100px]"
                v-model="bill.desc"></textarea>
        </div>
        <div class="flex gap-2">
            <div class="flex flex-col flex-1 gap-2">
                <label class="text-start" for="month">Month</label>
                <select id="month" name="month" v-model="bill.currentMonth" @change="() => console.log(currentMonth)"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                    <!-- <option value="">Month</option> -->
                    <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
                </select>
            </div>
            <div class="flex flex-col flex-1 gap-2">
                <label class="text-start" for="year">Year</label>
                <select id="year" name="year" v-model="bill.currentYear"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                    <!-- <option value="">Year</option> -->
                    <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                </select>
            </div>
        </div>
        <div class="flex flex-col gap-2">
            <label class="text-start" for="amount">Amount</label>
            <input type="text" v-model="bill.amount" id="amount" name="amount" placeholder="Amount"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
        </div>
        <div v-if="users.length > 0" class="flex flex-col gap-2">
            <label class="text-start" for="for_user">For User</label>
            <!-- <input type="text" v-model="amount" id="for_user" name="amount" placeholder="Amount"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"> -->
            <template class="block">
                <v-text-field v-model="search" label="Search" single-line hide-details class="">
                </v-text-field>
                <v-data-table v-model="bill.selected" :headers="headers" :items="users" items-per-page="5"
                    select-strategy="all" item-value="id" show-select class="elevation-1" :search="search">
                    <template v-slot:item.departments="{ value }">
                        <v-chip :color="getColor(value)">
                            {{ value }}
                        </v-chip>
                    </template>
                </v-data-table>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        users: {
            type: Array,
            default: () => [],
        },
        bill: {
            type: Object,
            default: () => {
                return {
                    title: '',
                    desc: '',
                    currentMonth: '',
                    currentYear: '',
                    amount: '',
                    selected: [],
                }
            }
        }
    },
    mounted() {
        const currentYear = new Date().getFullYear();
        console.log(this.bill.currentMonth)

        for (let year = 2013; year <= currentYear; year++) {
            this.years.push(year);
        }

        for (let month = 1; month <= 12; month++) {
            this.months.push(month);
        }

        this.$nextTick(() => {
            const input = this.$el.querySelector('input');
            if (input) {
                input.focus();
            }
        });
    },
    data() {
        return {
            search: "",
            months: [],
            years: [],
            headers: [
                {
                    title: 'Name',
                    align: 'start',
                    sortable: false,
                    key: 'name',
                },
                { title: 'Departments', key: 'departments' },
                { title: 'Join Year', key: 'join_year' },
            ],
        }
    },
    methods: {
        getColor(departments) {
            if (departments === "IT") return 'red'
            else if (departments === "MO") return 'orange'
            else return 'green'
        },
    },
    directives: {
        focus: {
            inserted: function (el) {
                el.focus();
            }
        }
    },
}
</script>