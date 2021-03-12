export default {
    user:{
		latitude:'',
		longitude:'',
		appType:3,
		role:0,
		appVersion:'1.0.0'
    },
    setUser(data){
        this.user = Object.assign({},this.user,data) 
    }
}