import * as axios from "axios"

const codeboard = document.getElementById("codeboard");
axios.get('http://127.0.0.1:8000/api/dummyData').then((res) =>{
  codeboard.cellData = res.data;
});