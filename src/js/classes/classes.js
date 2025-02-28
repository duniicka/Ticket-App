export default class User{
    constructor(username, email, password, balance){
        this.role="user"
        this.username=username
        this.email=email
        this.password=password
        this.balance=Number(balance) || 0
        this.profilPictureUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk9rKhG6pgOGLs70HP8u6nBJ5OkToBWXPAUg&s"
        this.accountCreationDate=new Date().toISOString().split('T')[0]
        this.totalSpentMoney=0
        this.favourites=[]
    }
}