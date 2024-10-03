//mask password
function maskPassword(pass){
    let str = "";
    for(let i = 0; i < pass.length;i++){
        str += "*";
    }
    return str;
}

//copying text
function copyText(text){
    navigator.clipboard.writeText(text).then(
        ()=>{
            document.getElementById("alert").style.display = "inline";
            setTimeout(()=>{
                document.getElementById("alert").style.display = "none";

            },1000);
        }
    );
}


//deleting password
const deletePassword = (website, username) => {
    console.log("Delete")
    let data = localStorage.getItem('passwords');
    let arr = JSON.parse(data);

    let NewArr = arr.filter((e) =>{
        return e.website != website && e.username != username;
    })
    localStorage.setItem("passwords", JSON.stringify(NewArr));
    showPassword();

}

//inserting data in table
const showPassword = () => {
let tb = document.querySelector('table');
let data = localStorage.getItem('passwords');
    if (data == null || JSON.parse(data).length == 0){
    tb.innerHTML = `
            <tr>
                <th>Website</th>
                <th>Username</th>
                <th>Password</th>
                <th>Delete</th>
            </tr>
            <tr>
                <td>No data</td>
                <td>No data</td>
                <td>No data</td>
                <td>No data</td>
            </tr>
    `
}
else{
    tb.innerHTML = `
            <tr>
                <th>Website</th>
                <th>Username</th>
                <th>Password</th>
                <th>Delete</th>
            </tr>
    `
    let arr = JSON.parse(data);
    let str = "";
    for(let i = 0; i < arr.length; i++){
        const element = arr[i]
        str += `
        <tr>
           <td><a href="${element.website}" target="_blank" class="link"> ${element.website}</a> <img onclick="copyText('${element.website}')" src="./copy.svg"  alt= "Copy Button"  ></td>
           <td>${element.username} <img onclick="copyText('${element.username}')" src="./copy.svg"  alt= "Copy Button"  ></td>
           <td>${maskPassword(element.password)}  <img onclick="copyText('${element.password}')" src="./copy.svg"  alt= "Copy Button" > </td>
           <td><button class="del" id="${element.website}"  onclick="deletePassword('${element.website}','${element.username}')">Delete</button></td>
        </tr>
        `
        
    }
    //tb.innerHTML = "";
    tb.innerHTML = tb.innerHTML + str;
    website.value = "";
    username.value = "";
    password.value = "";

}

}

showPassword();

//getting info from form 
document.querySelector("#btn").addEventListener("click",(e)=>{
    e.preventDefault();  
    console.log("Submit button clicked");
    console.log(website.value,username.value, password.value) //id can be accessed directly without using getElementById
    
    if (!website.value || !username.value || !password.value) {
        alert("Please fill in all the fields.");
    } else {
        let passwords = localStorage.getItem("passwords");
        if(passwords == null){  //if passwords item doesnt exist previously.
            
            let json = []
            json.push({website:website.value,username:username.value,password:password.value});
            //alert("password saved")
            localStorage.setItem("passwords",JSON.stringify(json)) //setItem(key,value) in strings
        }
        else{
            let json = JSON.parse(localStorage.getItem("passwords"));
            json.push({ website: website.value, username: username.value, password: password.value });
            //alert("password saved")
            localStorage.setItem("passwords", JSON.stringify(json))
        }
        showPassword();
    }
})