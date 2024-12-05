document.body.innerHTML=`    <nav class="nav-header">
         <div class="toggle-menu">
            <img src="assets/menu.svg" alt="toggle" class="toggle">
        </div>
        <h1><a class="nav-branding">
            <span>Jervis</span>
            <span>gallery</span>
        </a></h1>
        <ul class="nav-list">
            <div class="toggle-cancle">
              <img src="assets/cancle.svg" alt="toggle" class="toggle">
            </div>
            <li class="home">Home</li>
            <li class="gal">gallery</li>
            <li class="dashboard">Dashboard</li>
            <li class="log">Login</li>
            <li class="reg">Register</li>
        </ul>
        <div class="nav-icons">
            <img src="assets/icons8-heart-24.png" alt="heart-icon" class="heart-icon">
            <img src="assets/download.png" alt="carts-icon" class="carts-icon">
        </div>
    </nav>
    <div class="header-div">
        <p>Todays deal 100% sure</p>
        <div class="header-search">
            <input type="text" class="header-search-input" placeholder="search jervix">
            <button type="submit">Search</button>
        </div>
        <p>Shop top categorie</p>
    </div>
</header>
<section class="current">

</section>
`

const toggleMenu = document.querySelector(".toggle-menu");
const toggleCancle = document.querySelector(".toggle-cancle");
const current = document.querySelector('.current');
let currentPage = localStorage.getItem('current')

toggleCancle.onclick = ()=>{
   navList.style.display="none"
   navigate(currentPage)
}
const navList = document.querySelector(".nav-list")
toggleMenu.onclick = ()=>{
    if(navList.style.display==="block"){
        navList.style.display="none"
    } else{
        navList.style.display="block"
        current.innerHTML=``
    }

}

//navigate 

const home = document.querySelector('.home');
const gallery = document.querySelector('.gal');
const dashboard = document.querySelector('.dashboard');
const login = document.querySelector('.log');
const reg = document.querySelector('.reg');

current.innerHTML =
`<section class="hero">
   <div class="">
    <h2 class="hero-title">Get <span class="sixty">60%</span> jackpot deal on all outfits</h2>
   <p class="hero-text">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vulputate, risus nec vestibulum blandit, enim ex placerat erat, id luctus purus justo eget mauris. 
  </p>
  <button class="hero-btn">Shop Now</button>
  </div>
  <div class="hero-img">
    <img src="assets/hero.png" alt="" class="">
  </div>
</section>`

const navigate = (page, cPage)=>{
   document.title=page;
    if(page==='home' || cPage==='home'){
        current.innerHTML =
            `<section class="hero">
               <div class="">
                <h2 class="hero-title">Get <span class="sixty">60%</span> jackpot deal on all outfits</h2>
               <p class="hero-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vulputate, risus nec vestibulum blandit, enim ex placerat erat, id luctus purus justo eget mauris. 
              </p>
              <button class="hero-btn">Shop Now</button>
              </div>
              <div class="hero-img">
                <img src="assets/hero.png" alt="" class="">
              </div>
            </section>`
}
    if(page==='gallery' || cPage==='gallery'){
        current.innerHTML=
            `<section id="image-gallery">
            </section>`
            const imageGallery = document.getElementById('image-gallery');
            imageGallery.innerText= 'Fetching images...'
      displayImages= async ()=>{
      try {
         const resp = await fetch('/api/v1/uploads')
         const data = await resp.json();
         // console.log(data)  
         imageGallery.innerText= ''
         for (const img of data.images){
            imageGallery.innerHTML+= `<div class='image-div'>
               <img src='${img.image}' alt=${img.name} class='img'/>
                  <div class='text'>
                     <img src= 'assets/icons8-heart-24.png' alt='images'/>
                     <!---<img src= 'assets/icons8-eye-24.png' alt='images'/>-->
                  </div>
            </div>`
         }
      } catch (error) {
         console.log(error)
      }     
    
}
displayImages()

 }

    if(page==='dashboard' || cPage==='dashboard'){
      const user = localStorage.getItem('user');
        current.innerHTML=
         `<section id="dashboard">
         <h3 class='user'>Hi, ${user}</h3>
                     <p id="msg" style="text-align:center"></p>
            <ul class='das-nav'>
               <li class='my-images'>
                  <img src= 'assets/images.png' alt='images  class=''/>
                  <p class='img-txt'>My images</p>
               </li>
               <li class='upload-image'>
                  <img src= 'assets/upload.png' alt='upload-images'/>
                  <p class='img-txt-2'>Upload image</p>
               </li>
               <li class='logout'>
                  <img src= 'assets/logout.png' alt='images  class=''/>
                  <p class='img-txt-3'>Logout</p>
               </li>

            </ul>
            <section id="gallery" class=''>
            </section>
            <section id="upload-section" class='upload-section'>
            <form id="upload" enctype="multipart/form-data">
            <p id="msg"></p>
            <div>
               <input type="file" id="file" placeholder="uplaod image"/>
            </div>
            <div>
               <input type="text" placeholder="image name" id="image-name" name="image"/>
            </div>
            <div>
               <input type="text" placeholder="image description" id="des"/>
            </div>
            <div class="preview"></div>
           <button class="btn">Save</button>
           </form>
           </section> 
        </section>`
        const showMyImage = document.querySelector('.my-images');
        const msg = document.getElementById('msg')
        const logout = document.querySelector('.logout');
        console.log(user)
        if(user === ''){
        navigate('login')
  }  
        logout.onclick = () =>{
         localStorage.setItem('user', '');
         localStorage.setItem('token', '');
         localStorage.setItem('user', '');
         localStorage.setItem('userId', ''); 
         navigate('login')
        }
        showMyImage.onclick = ()=> {
         upload.classList.remove('active');
         imageGallery.classList.add('active');
         imageGallery.style.display='flex'

        }
        const uploadImage = document.querySelector('.upload-image');
        const upload = document.querySelector('.upload-section');
        uploadImage.onclick = () =>{
         imageGallery.classList.remove('active')
         imageGallery.style.display='none'
         upload.classList.add('active');
      }
        const imageGallery = document.getElementById('gallery');
        const userId= localStorage.getItem('userId')
        displayImages= async ()=>{
         imageGallery.innerHTML=`<p>Fetching Images.....</p>`
         try {
         const token = localStorage.getItem('token')
           const resp = await fetch(`/api/v1/uploads/${userId}/images`, {
            headers:{
               "Authorization":`Bearer ${token}`
            },
           }
           
           )
           imageGallery.innerHTML=``
           const data = await resp.json();
           // console.log(data)
           if(!resp.ok){
            imageGallery.innerHTML=`<p>Make sure you are logged in</p>`
           }
           if(data.message==='No images found.'){
            imageGallery.innerHTML=`<p>${data.message}</p>`
           }else{
           for (const img of data.images){
              imageGallery.innerHTML+= `<div class='image-div'>
                 <img src='${img.image}' alt=${img.name} class='img' id=${img._id}/>
                    <div class='text'>
                      <img src= 'assets/edit.png' alt='images'/>
                      <img src= 'assets/delete.png' alt='images' class='delete' id='${img._id}'/>
                    </div>
              </div>`
              let deleteImage = data.images.length >1 ? document.querySelectorAll('.delete'): [document.querySelector('.delete')]
               deleteImage.forEach((img)=>{
                  img.onclick = async (e)=>{
                     const imageId = e.target.id;
                     msg.innerText= 'deleting image...'
                     try {
                      const token = localStorage.getItem('token')
                        const resp = await fetch(`/api/v1/uploads/${userId}/images/${imageId}`, {
                           method:'DELETE',
                         headers:{
                            "Authorization":`Bearer ${token}`
                         },
                        }
                        
                        )
                        msg.innerText='deleting....'
                        const data = await resp.json();
                        // console.log(data)  
                        msg.innerText= data.message 
                        location.reload()
                        console.log(data.message)
                     } catch (error) {
                        msg.innerText= error 
                        // console.log(error)
                     }     
                   
                  }
                  
      
               })
           }
         }
        } catch (error) {
           msg.innerText= error 
           // console.log(error)
        }     
      
  }
  displayImages()

        const fileInput = document.querySelector('#file');
 
        fileInput.addEventListener('change', (e)=>{
           const file = e.target.files[0];
           const fileReader = new FileReader()
           fileReader.addEventListener('load', ()=>{
             const imageSrc = fileReader.result;
            const preview = document.querySelector('.preview');
            preview.innerHTML=`<img src="${imageSrc}" id="image-src" />`;
           })
           fileReader.readAsDataURL(file)
        })
        const UploadApi = async (URL, formData)=>{
         msg.innerText= 'Sending...'
           try {
              const token = localStorage.getItem('token')
              console.log(token)
              const resp = await fetch(URL, {
                 method:"POST",
                 headers:{
                    "Authorization":`Bearer ${token}`
                 },
                 body: formData
              })
              const data = await resp.json();
              if(!resp.ok){
               msg.innerText= data.message 
            }
            if(resp.status===401){
               msg.innerText= data.message 
            }
              console.log(data)  
              if(resp.ok){
               msg.innerText= data.message 
               msg.style.color='green'
               location.reload()
               return 
            }

           } catch (error) {
            msg.innerText= 'server error' + error 
            console.log(error)
           }
        }
        
        const save = document.getElementById('upload');
        save.onsubmit = (e)=>{
           const msg = document.getElementById('msg')
           e.preventDefault()
           const description = document.getElementById('des');
           const imageName = document.getElementById('image-name')
           if(imageName.value ===''){
              msg.innerText="image name is required"
              return 
           }
           if(description.value ===''){
              msg.innerText="Image description  is required"
              return 
           }
           const formData = new FormData();
           formData.append('image', fileInput.files[0]); // 'image' matches multer's field name
           formData.append('name', imageName.value);
           formData.append('description', description.value);
           UploadApi('/api/v1/uploads', formData)
        }
        
        
}
       if(page==='login' || cPage==='login'){
        current.innerHTML=
            `<section class="login section">
              <p>Login</p>
               <form class="form" id="submit">
               <p id="msg"></p>
               <div>
                <input type="text" placeholder="Enter your username..." id="username"/>
              </div>
              <div>
               <input type="password" placeholder="Enter your username..." id="password"/>
              </div>
              <div>
                <button class="submit">Login</button>
            </div>
          </form>
       </section>`
const submitBtn = document.getElementById('submit');
const msg = document.getElementById('msg')
submitBtn.onsubmit = async (e)=>{
   e.preventDefault()
   const username = document.getElementById('username');
   const password = document.getElementById('password');
   if(username.value === ''){
      msg.innerText= "username is required"
      return
   }
   if(password.value === ''){
      msg.innerText= "password is required"
      return 
   }
   if(password.value.length < 8){
      msg.innerText= "password should at least be 8 characters long"
      return 
   }
   const formData = {
      username:username.value,
      password:password.value
   }
   msg.innerText= 'Loading...'
   try {
      const resp = await fetch('/api/v1/auth/login', {
         method:"POST",
         headers:{
            'content-Type':'application/json',
         },
         body: JSON.stringify(
            formData
         )
      })
      const data = await resp.json();
      if(!resp.ok){
        msg.innerText= data.message
      }else{        
        msg.style.color='green';
        msg.innerText= data.message 
        localStorage.setItem('token', data.user.token);
        localStorage.setItem('user', data.user.username);
        localStorage.setItem('userId', data.user.id);
      //   console.log(data.user)
        setTimeout(() => {
           navigate('dashboard')
        }, 1500);
      }
     //  console.log(data) 
     setTimeout(() => {
        localStorage.setItem('token', '');
        localStorage.setItem('user', '');
        localStorage.setItem('userId', '');
        navigate('login')
     }, 360000);
   } catch (error) {
      msg.innerText= 'server error' 
      console.log(error)
   }
}
 
}
   if(page==='register' || cPage==='register'){
        current.innerHTML= `<section class="login section">
        <p>Register</p>
         <form class="form" id="submit">
         <p id="msg"></p>
         <div>
          <input type="text" placeholder="Enter your username..." id="username"/>
        </div>
        <div>
         <input type="password" placeholder="Enter your username..." id="password"/>
        </div>
        <div>
          <button class="submit">Register</button>
      </div>
    </form>
 </section>`
 const submitBtn = document.getElementById('submit');
const msg = document.getElementById('msg')
submitBtn.onsubmit = async (e)=>{
   e.preventDefault()
   const username = document.getElementById('username');
   const password = document.getElementById('password');
   if(username.value === ''){
      msg.innerText= "username is required"
      return
   }
   if(password.value === ''){
      msg.innerText= "password is required"
      return 
   }
   if(password.value.length < 8){
      msg.innerText= "password should at least be 8 characters long"
      return 
   }
   const formData = {
      username:username.value,
      password:password.value
   }
   msg.innerText= 'Loading...'
   try {
      const resp = await fetch('/api/v1/auth/register', {
         method:"POST",
         headers:{
            'content-Type':'application/json',
         },
         body: JSON.stringify(
            formData
         )
      })
      const data = await resp.json();
      if(!resp.ok){
        msg.innerText= data.message
      }else{
        msg.style.color='green';
        msg.innerText=` ${data.message}, redirecting you to login..`
        setTimeout(() => {
           navigate('login')
        }, 1500);
      }
     //  console.log(data) 
   } catch (error) {
      msg.innerText= 'server error' 
      console.log(error)
   }

    }
      }





localStorage.setItem('current', page)
}
home.addEventListener('click', ()=>{
    navigate('home')
    localStorage.setItem('current', 'home')
    if(window.screen.width<=789){navList.style.display="none"}
})

login.addEventListener('click', ()=>{
    navigate('login')
    localStorage.setItem('current', 'login')
    if(window.screen.width<=786){navList.style.display="none"}
})
reg.addEventListener('click', ()=>{
    navigate('register')
    localStorage.setItem('current', 'register')
    if(window.screen.width<=786){navList.style.display="none"}

})

dashboard.addEventListener('click', ()=>{
    navigate('dashboard')
    localStorage.setItem('current', 'dashboard')
    if(window.screen.width<=786){navList.style.display="none"}
})
gallery.addEventListener('click', ()=>{
    navigate('gallery')
    localStorage.setItem('current', 'gallery')
    if(window.screen.width<=786){navList.style.display="none"}

})


navigate(currentPage, currentPage)



//upload
//gallery 


