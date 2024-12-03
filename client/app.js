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
            <li class="upl">upload</li>
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

toggleCancle.onclick = ()=>{
   navList.style.display="none"
}
const navList = document.querySelector(".nav-list")
toggleMenu.onclick = ()=>{
    if(navList.style.display==="block"){
        navList.style.display="none"
    } else{
        navList.style.display="block"
    }

}

//navigate 

const current = document.querySelector('.current');
const home = document.querySelector('.home');
const gallery = document.querySelector('.gal');
const upload = document.querySelector('.upl');
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
               <div class='prev'></div>
            </section>`
            const imageGallery = document.getElementById('image-gallery');
      displayImages= async ()=>{
      try {
         const resp = await fetch('/api/v1/uploads')
         const data = await resp.json();
         // console.log(data)  
         for (const img of data.images){
            imageGallery.innerHTML+= `<div class='image-div'>
               <img src='${img.image}' alt=${img.name} />
                  <div class='text'>
                     <img src= 'assets/icons8-heart-24.png' alt='images'/>
                     <!---<img src= 'assets/icons8-eye-24.png' alt='images'/>-->
                  </div>
            </div>`
         }
      } catch (error) {
         msg.innerText= error 
         // console.log(error)
      }     
    
}
displayImages()

 }

    if(page==='upload' || cPage==='upload'){
        current.innerHTML=
            `<section id="upload">
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
        </section>`
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
               msg.innerText= "there is problem uploading this image" 
            }
            if(resp.status===401){
               msg.innerText= data.message 
            }
              console.log(data)  
              if(resp.ok){
               msg.innerText= data.message 
               msg.style.color='green'
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
        setTimeout(() => {
           navigate('gallery')
        }, 1500);
        localStorage.setItem('token', data.token);
      }
     //  console.log(data) 
     setTimeout(() => {
        localStorage.setItem('token', '');
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

upload.addEventListener('click', ()=>{
    navigate('upload')
    localStorage.setItem('current', 'upload')
    if(window.screen.width<=786){navList.style.display="none"}
})
gallery.addEventListener('click', ()=>{
    navigate('gallery')
    localStorage.setItem('current', 'gallery')
    if(window.screen.width<=786){navList.style.display="none"}

})

let currentPage = localStorage.getItem('current')

navigate(currentPage, currentPage)



//upload
//gallery 


