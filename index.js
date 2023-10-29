const todo_forms = document.querySelector(".form") ;
const save_button = document.querySelector("#save-btn");
const input_title = document.querySelector("#title");
const list = document.querySelector(".list");
const filterse = document.querySelector("#filters")



let todo_list = []
//work with DOM
function RenderItem(todoItem){
    const Item = document.createElement("div");
      Item.classList.add("form")
     
      const checkbox = document.createElement("input")
      checkbox.setAttribute("type" , "checkbox")
      if(todoItem.status){
        checkbox.checked = todoItem.status
      }
      
      
      const span = document.createElement("span")
      span.textContent = todoItem.title
      
      const delet = document.createElement("button")
      delet.classList.add("delet_btn")
      delet.textContent= "DELET"
      
      Item.appendChild(checkbox)
      Item.appendChild(span)
      Item.appendChild(delet)
      list.appendChild(Item)

      
     
      
      delet.addEventListener("click" , ()=>{ 
        remove(todoItem.title)
        
     })

      checkbox.addEventListener("click" , ()=>{
       toggleStatus(todoItem.title)
       console.log(todo_list)
      })
      
}

function RenderList(){
   list.innerHTML=""
   
    for (let i = 0 ; i< todo_list.length ; i++){
        const titlee = todo_list[i]
        RenderItem(titlee)
}
}

function clear_input(){
    input_title.value = "";
}
//work with storage
function syncSrorage() {
    const next_list = JSON.stringify(todo_list)
    localStorage.setItem("my_list", next_list) 
}
function load_from_storage(){
    const todos_list_api = "https://jsonplaceholder.typicode.com/todos"

    fetch(todos_list_api).then((response)=>{
        console.log(response)
        return response.json()
    }).then((data)=>{
        todo_list = data
        RenderList()
            
       
    })
    
    /* const ListFromStorage = JSON.parse(localStorage.getItem("my_list")) || []
    todo_list=ListFromStorage
    RenderList()
 */
    }



//functionality
function filterSelect(events){
    
    list.innerHTML=""
        if(events === "done"){
            console.log(events)
            for (let i=0 ; i<todo_list.length; i++){
               if(todo_list[i].status===true){
                RenderItem(todo_list[i])
               }
            }
            
        }else 
            if(events === "todo"){
                console.log(events)
                for (let i=0 ; i<todo_list.length; i++){
                   if(todo_list[i].status===false){
                    RenderItem(todo_list[i])
                   } 
                } 
            
                }
            else{
                    if(events === "all"){
                    console.log("events")
                    RenderList()} 
                
                    }
                
                    
                
                
            }
        
            

       

    
       
    /*    switch(event){
                 case done: {todo_list.filter((item)=>{
                    const listFilter = todo_list.status === true
                 })                                        
                 break;}
                 case todo: {todo_list.filter((item)=>{
                    const listFilter = todo_list.status === false
                 })
                 break;}
                 
                default: todo_list.filter((item)=>{
                    const listFilter= (item.status===true && item.status===false)
                })} */
         


function toggleStatus(title){
    for (let i=0 ; i<todo_list.length; i++){
        const list_item = todo_list[i]
         if(list_item.title===title){
            list_item.status =   list_item.status ? false : true 
            
         }
         
         syncSrorage()
       }
}
function addItem(item){
    const next_item = {
        title : item.title,
        status : item.status
      } 
      todo_list.push(next_item)
      syncSrorage()
}
function Donefunc(item){
    todo_list.filter((item) , ()=>{
         return item.status===true
    })
        
    }



/* function filters(filterItem){
    for (let i=0 ; i<todo_list.length; i++){
        const list_item = todo_list[i]
        
        if(list_item.status===filterItem){
           /*  list_item.filter((item)=>{
                return list_item[i]
            }) */
          /*   console.log(list_item[i])
            
        }
        RenderItem()
}}  */
function remove(title){
    for (let i=0 ; i<todo_list.length; i++){
        const list_item = todo_list[i]
         if(list_item.title===title){
            todo_list.splice(i,1)
            
         }
         
         syncSrorage()
         RenderList()
       }
}
/* function remove(title) {
    console.log("remove" , title)
    const remove_item = {
        title : item.title , 
        status : item.status
    }
    todo_list.splice(i, 1)
} */

// run your app
function onAddItem(){
    const val = input_title.value  
    if (val===""){
        alert("you should input no null")
    }else{
       const item = {
        title:val,
        status:false
       }
      addItem(item)
      RenderItem(item)
      clear_input()

    }
}    
function Events(){
    /* save_button.addEventListener("click" , onAddItem) */
    /* todo_forms.addEventListener("submit", onAddItem) */
   todo_forms.addEventListener("submit", (eve)=>{
    eve.preventDefault()
    console.log("form sent")
    onAddItem()
}) 
   filterse.addEventListener("change" , ()=>{
      
        filterSelect(filterse.value)
        
      })
    
}
//reload
function init(){
    load_from_storage()
    Events()


}

init()
