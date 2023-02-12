const filterString = document.getElementById("filterTxt")
const filterOption = document.getElementById("filterOption")
let timer
filterString.addEventListener('keyup', (e) => {
    e.preventDefault();
    console.log(filterString.value)
    clearTimeout(timer)
    timer = setTimeout(() => {
        if(filterOption.value == "Producto"){
            fetch("http://localhost:8080/api/enterprise/findProductsByName",{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name":filterString.value
                }
                )
            }).then(res =>{
                console.log(res)
                return  res.ok ? res.json():Promise.reject(res)
            }).then(json=>{
                console.log(json)
            })
            .catch(er=>{
                console.log("Error", er)
            }).finally(()=>{
                console.log("Promesa recibida")
            })
        }else{
            let res=   fetch("http://localhost:8080/api/enterprise/findProductsByEnterpriseName",{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name":filterString.value
                }
                )
            }).then(res=>{
                console.log(res)
                return  res.ok ? res.json():Promise.reject(res)
            }).then(json=>{
                console.log(json)
            })
            .catch(er=>{
                console.log("Error", er)
            }).finally(()=>{
                console.log("Promesa recibida")
            })
        }
    }, 500)

    


   
    
});