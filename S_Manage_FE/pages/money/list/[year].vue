<script setup>
// import isLogin from "~/stores/isLogin";
import axios from "axios";
const route = useRoute();
const router = useRouter();

const config = useRuntimeConfig();
const API_BE = config.public.API_BASE_BE;

const yearParam = route.params.year;

definePageMeta({
  layout: "custom",
});

const months = [
  "T1",
  "T2",
  "T3",
  "T4",
  "T5",
  "T6",
  "T7",
  "T8",
  "T9",
  "T10",
  "T11",
  "T12",
];

const Data = ref([]);

const dataYear = ref([]);

const yearSelected = ref('');

yearSelected.value = yearParam


const getYear = async () => {
  try {
    const url = `${API_BE}/api/v1/statistic/list-year`;
    const response = await axios.get(url);

    return (dataYear.value = response.data);
  } catch (error) {
    console.log(error);
    return [];
  }
};

const fetchData = async (yearr) => {
  try {
    const url = `${API_BE}/api/v1/statistic/list-money/${yearr}`;
    const response = await axios.get(url);
    return (Data.value = response.data);
  } catch (error) {
    console.log(error);
    return [];
  }
};

const onSelectChange = () => {
  console.log('Selected year:', yearSelected.value);
  router.push(`/money/list/${yearSelected.value}`);
}


onMounted(() => {

  // isLogin();
  getYear();
  if (yearParam) {
    fetchData(yearParam);
  }
});
</script>

<template>
  <div class="bg-white">
    <div class="limiter">
      <div class="relative flex items-center h-12 mt-8 w-36">
        <font-awesome-icon :icon="['fas', 'chevron-down']" class="absolute right-2" />

        <select id="countries"
          class="w-full h-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="yearSelected" @change="onSelectChange">
          <!-- <option selected></option> -->
          <option v-for="year in dataYear" :key="year" :value="year" :selected="year == yearParam">
            {{ year }}
          </option>

        </select>
      </div>
      <div class="container-table100">
        <div class="wrap-table100">
          <div class="table100 ver1">
            <div class="wrap-table100-nextcols js-pscroll">
              <div class="table100-nextcols">
                <table>
                  <thead>
                    <tr class="row100 head">
                      <th class="cell100 column6">STT</th>
                      <th class="text-left cell100 column2">Họ và tên</th>
                      <th class="text-left cell100 column2">Chuyên môn</th>
                      <!-- <th class="cell100 column3">Khóa</th> -->
                      <th class="cell100 column4">Số tháng nợ</th>
                      <th class="pl-4 cell100 column8">
                        <p>Năm</p>
                    <tr class="flex justify-around">
                      <td class="pt-2 pb-0" v-for="month in months" :key="month">
                        <p class="text-black">{{ month }}</p>
                      </td>
                    </tr>
                    </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="row100 body" v-for="user in Data" :key="user.id_user">
                      <td class="text-center cell100 column6">
                        {{ user.id_user }}
                      </td>
                      <td class="cell100 column2">{{ user.name }}</td>
                      <td class="cell100 column2">{{ user.name_major }}</td>
                      <!-- <td class="cell100 column3">{{ user. }}</td> -->
                      <td class="text-center cell100 column7">
                        {{ user.unpaidMonths }}
                      </td>
                      <td class="pl-4 cell100 column8">
                        <CheckCard :DataBill="user.bills" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/*//////////////////////////////////////////////////////////////////
[ RESTYLE TAG ]*/
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

body,
html {
  height: 100%;
  font-family: sans-serif;
}

/* ------------------------------------ */
a {
  margin: 0px;
  transition: all 0.4s;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
}

a:focus {
  outline: none !important;
}

a:hover {
  text-decoration: none;
}

/* ------------------------------------ */
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0px;
}

p {
  margin: 0px;
}

ul,
li {
  margin: 0px;
  list-style-type: none;
}

/* ------------------------------------ */
input {
  display: block;
  outline: none;
  border: none !important;
}

textarea {
  display: block;
  outline: none;
}

textarea:focus,
input:focus {
  border-color: transparent !important;
}

/* ------------------------------------ */
button {
  outline: none !important;
  border: none;
  background: transparent;
}

button:hover {
  cursor: pointer;
}

iframe {
  border: none !important;
}

/*//////////////////////////////////////////////////////////////////
[ Scroll bar ]*/
.js-pscroll {
  position: relative;
  overflow: hidden;
}

.table100 .ps__rail-x {
  z-index: 1010;
  height: 6px;
  background-color: transparent;
  opacity: 1 !important;
  bottom: 10px;
}

.table100 .ps__rail-x::before {
  content: "";
  display: block;
  position: absolute;
  background-color: #e6e6e6;
  height: 100%;
  width: calc(100% - 30px);
  left: 15px;
  top: 0px;
}

.table100 .ps__rail-x .ps__thumb-x {
  height: 100%;
  bottom: 0;
  background-color: transparent;
  opacity: 1 !important;
}

.table100 .ps__rail-x .ps__thumb-x::before {
  content: "";
  display: block;
  position: absolute;
  background-color: #b3b3b3;
  height: 100%;
  width: calc(100% - 30px);
  top: 0;
  left: 15px;
}

/*//////////////////////////////////////////////////////////////////
[ Table ]*/

.limiter {
  width: 100%;
  margin: 0 auto;
}

.container-table100 {
  /* max-width: 100%; */
  /* width: 100%; */
  margin: 0 auto;
  /* min-height: 100vh; */
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  /* padding: 33px 100px; */
}

.wrap-table100 {
  width: 100%;
}

/*//////////////////////////////////////////////////////////////////
[ Table ]*/
.table100 {
  background-color: #fff;
}

table {
  width: 100%;
}

th,
td {
  font-weight: unset;
  padding-right: 10px;
}

.column1 {
  width: 100%;
  padding-left: 40px;
}

.column2 {
  width: 151px;
  padding-left: 11px;
}

.column3 {
  width: 205px;
}

.column4 {
  width: 93px;
}

.column5 {
  width: 235px;
}

.column6 {
  width: 100px;
}

.column7 {
  width: 50px;
}

.column8 {
  width: 405px;
}

.table100 th {
  padding-top: 21px;
  padding-bottom: 10px;
}

.table100 td {
  padding-top: 16px;
  padding-bottom: 16px;
}

/*==================================================================
[ Fix col ]*/
.table100 {
  width: 100%;
  position: relative;
}

.table100-firstcol {
  background-color: #fff;
  position: absolute;
  z-index: 10;
  width: 310px;
  top: 0;
  left: 0;
}

.table100-firstcol table {
  background-color: #fff;
}

.wrap-table100-nextcols {
  width: 100%;
  overflow: auto;
  padding-left: 10px;
  /* padding-left: 310px; */
  padding-bottom: 28px;
}

.table100-nextcols table {
  table-layout: fixed;
}

.shadow-table100-firstcol {
  box-shadow: 8px 0px 10px 0px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 8px 0px 10px 0px rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 8px 0px 10px 0px rgba(0, 0, 0, 0.05);
  -o-box-shadow: 8px 0px 10px 0px rgba(0, 0, 0, 0.05);
  -ms-box-shadow: 8px 0px 10px 0px rgba(0, 0, 0, 0.05);
}

.table100-firstcol table {
  background-color: transparent;
}

/*==================================================================
[ Ver1 ]*/

.table100.ver1 th {
  font-family: Roboto-Bold;
  font-size: 14px;
  color: #333333;
  line-height: 1.4;
  text-transform: uppercase;
}

.table100.ver1 td {
  font-family: Roboto-Medium;
  font-size: 15px;
  line-height: 1.4;
}

.table100.ver1 .table100-firstcol td {
  color: #000000;
}

.table100.ver1 .table100-nextcols td {
  color: #000000;
}

.table100.ver1 tr {
  border-bottom: 1px solid #f2f2f2;
}

.table100.ver1 .head {
  border-bottom: 1px solid #585858;
}
</style>