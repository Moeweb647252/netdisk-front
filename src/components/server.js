import axios from "axios";

class NDServer{
  addr;

  constructor(addr){
    this.addr = addr;
  }

  async getUser(){
    axios.get(this.addr+"api/user/info")
  }
}