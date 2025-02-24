export default class User{
    constructor(username, email, password, balance, profilPictureUrl){
        this.role="user"
        this.username=username
        this.email=email
        this.password=password
        this.balance=balance
        this.profilPictureUrl=profilPictureUrl
        this.accountCreationDate=new Date().toISOString().split('T')[0]
        this.totalSpentMoney=0
    }
}